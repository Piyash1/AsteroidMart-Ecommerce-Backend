from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import status
from .models import *
from .serializers import *
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

# Create your views here.
stripe.api_key = settings.STRIPE_SECRETE_KEY
endpoint_secret = settings.WEBHOOK_SECRET


User = get_user_model()

@api_view(['GET'])
def existing_user(request, email):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    email = request.data.get('email')
    username = request.data.get('username')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')
    profile_picture_url = request.data.get('profile_picture_url')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    if not username:
        # Fallback username if not provided
        username = email.split('@')[0]

    # If user exists, return it idempotently
    try:
        user = User.objects.get(email=email)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        pass

    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )
        # Unusable password since using OAuth
        user.set_unusable_password()
        if hasattr(user, 'profile_picture_url'):
            user.profile_picture_url = profile_picture_url
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
def product_list(request):
    products = Product.objects.filter(featured=True)
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductDetailSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategoryListSerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def category_detail(request, slug):
    category = Category.objects.get(slug=slug)
    serializer = CategoryDetailSerializer(category)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    cart_code = request.data.get('cart_code')
    product_id = request.data.get('product_id')
    
    cart, created = Cart.objects.get_or_create(cart_code=cart_code)
    product = Product.objects.get(id=product_id)
    
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    cart_item.quantity = 1
    cart_item.save()
    
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['PUT'])
def update_cartitem_quantity(request):
    try:
        cartitem_id = request.data.get('item_id')
        quantity = request.data.get('quantity')
        
        # Validate required fields
        if not cartitem_id or quantity is None:
            return Response(
                {"error": "Missing required fields: item_id and quantity are required"}, 
                status=400
            )
        
        # Validate quantity
        try:
            quantity = int(quantity)
            if quantity <= 0:
                return Response(
                    {"error": "Quantity must be greater than 0"}, 
                    status=400
                )
        except (ValueError, TypeError):
            return Response(
                {"error": "Quantity must be a valid number"}, 
                status=400
            )
        
        # Get cart item
        try:
            cartitem = CartItem.objects.get(id=cartitem_id)
        except CartItem.DoesNotExist:
            return Response(
                {"error": f"Cart item with id {cartitem_id} does not exist"}, 
                status=404
            )
        
        # Update quantity
        cartitem.quantity = quantity
        cartitem.save()
        
        serializer = CartSerializer(cartitem.cart)
        return Response({"data": serializer.data, "message": "Cart updated successfully"})
        
    except Exception as e:
        return Response(
            {"error": f"Failed to update cart item: {str(e)}"}, 
            status=500
        )


@api_view(['POST'])
def add_review(request):
    product_id = request.data.get('product_id')
    email = request.data.get('email')
    rating = request.data.get('rating')
    comment = request.data.get('comment', '')
    
    # Validate required fields
    if not all([product_id, email, rating]):
        return Response(
            {"error": "Missing required fields: product_id, email, and rating are required"}, 
            status=400
        )
    
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": f"Product with id {product_id} does not exist"}, 
            status=404
        )
    
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": f"User with email '{email}' does not exist"}, 
            status=404
        )
    
    # Check if user already reviewed this product
    if Review.objects.filter(user=user, product=product).exists():
        return Response(
            {"error": "You have already reviewed this product"}, 
            status=400
        )
    
    # Validate rating range
    if not (1 <= int(rating) <= 5):
        return Response(
            {"error": "Rating must be between 1 and 5"}, 
            status=400
        )
    
    try:
        review = Review.objects.create(
            user=user,
            product=product,
            rating=rating,
            comment=comment
        )
        serializer = ReviewSerializer(review)
        
        return Response({"data": serializer.data, "message": "Review added successfully"})
    
    except Exception as e:
        return Response(
            {"error": f"Failed to create review: {str(e)}"}, 
            status=500
        )
        
@api_view(['PUT'])
def update_review(request, pk):
    # Check if review exists
    try:
        review = Review.objects.get(id=pk)
    except Review.DoesNotExist:
        return Response(
            {"error": f"Review with id {pk} does not exist"}, 
            status=404
        )
    
    rating = request.data.get('rating')
    comment = request.data.get('comment')
    
    # Validate that at least one field is provided
    if not any([rating, comment]):
        return Response(
            {"error": "At least one field (rating or comment) must be provided for update"}, 
            status=400
        )
    
    # Validate rating if provided
    if rating is not None:
        try:
            rating = int(rating)
            if not (1 <= rating <= 5):
                return Response(
                    {"error": "Rating must be between 1 and 5"}, 
                    status=400
                )
        except (ValueError, TypeError):
            return Response(
                {"error": "Rating must be a valid integer"}, 
                status=400
            )
    
    try:
        # Update only the fields that are provided
        if rating is not None:
            review.rating = rating
        if comment is not None:
            review.comment = comment
            
        review.save()
        
        serializer = ReviewSerializer(review)
        return Response({"data": serializer.data, "message": "Review updated successfully"})
    
    except Exception as e:
        return Response(
            {"error": f"Failed to update review: {str(e)}"}, 
            status=500
        )

@api_view(['DELETE'])
def delete_review(request, pk):
    # Check if review exists
    try:
        review = Review.objects.get(id=pk)
    except Review.DoesNotExist:
        return Response(
            {"error": f"Review with id {pk} does not exist"}, 
            status=404
        )
    
    try:
        # Store review data for response before deletion
        review_data = {
            "id": review.id,
            "product": review.product.name,
            "user": review.user.email,
            "rating": review.rating
        }
        
        review.delete()
        
        return Response({
            "message": "Review deleted successfully",
            "deleted_review": review_data
        })
    
    except Exception as e:
        return Response(
            {"error": f"Failed to delete review: {str(e)}"}, 
            status=500
        )
        
        
@api_view(['DELETE'])
def delete_cartitem(request, pk):
    try:
        cartitem = CartItem.objects.get(id=pk)
        cartitem.delete()
        return Response({"message": "Cart item deleted successfully"}, status=200)
    except CartItem.DoesNotExist:
        return Response({"error": "Cart item not found"}, status=404)
    except Exception as e:
        return Response({"error": f"Failed to delete cart item: {str(e)}"}, status=500)
    

@api_view(['POST'])
def add_to_wishlist(request):
    email = request.data.get('email')
    product_id = request.data.get('product_id')
    
    user = User.objects.get(email=email)
    product = Product.objects.get(id=product_id)
    
    wishlist = Wishlist.objects.filter(user=user, product=product)
    if wishlist:
        wishlist.delete()
        return Response({"message": "Product removed from wishlist successfully", "action": "removed"}, status=200)
    
    new_wishlist = Wishlist.objects.create(user=user, product=product)
    serializer = WishlistSerializer(new_wishlist)
    return Response({"message": "Product added to wishlist successfully", "action": "added", "data": serializer.data}, status=201)


@api_view(['GET'])
def product_search(request):
    query = request.query_params.get('query')
    if not query:
        return Response({"error": "Query parameter is required"}, status=400)
    
    products = Product.objects.filter(
        Q(name__icontains=query) | Q(description__icontains=query) | Q(category__name__icontains=query)
    ).distinct()
    
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def create_checkout_session(request):
    cart_code = request.data.get("cart_code")
    email = request.data.get("email")
    cart = Cart.objects.get(cart_code=cart_code)
    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email= email,
            payment_method_types=['card'],


            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {'name': item.product.name},
                        'unit_amount': int(item.product.price * 100),  # Amount in cents
                    },
                    'quantity': item.quantity,
                }
                for item in cart.cartitems.all()
            ] + [
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {'name': 'VAT Fee'},
                        'unit_amount': 500,  # $5 in cents
                    },
                    'quantity': 1,
                }
            ],


           
            mode='payment',
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",

            # success_url="https://next-shop-self.vercel.app/success",
            # cancel_url="https://next-shop-self.vercel.app/failed",
            metadata = {"cart_code": cart_code}
        )
        return Response({'data': checkout_session})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
    
    


@csrf_exempt
def my_webhook_view(request):
  payload = request.body
  sig_header = request.META['HTTP_STRIPE_SIGNATURE']
  event = None

  try:
    event = stripe.Webhook.construct_event(
      payload, sig_header, endpoint_secret
    )
  except ValueError as e:
    # Invalid payload
    return HttpResponse(status=400)
  except stripe.error.SignatureVerificationError as e:
    # Invalid signature
    return HttpResponse(status=400)

  if (
    event['type'] == 'checkout.session.completed'
    or event['type'] == 'checkout.session.async_payment_succeeded'
  ):
    session = event['data']['object']
    cart_code = session.get("metadata", {}).get("cart_code")

    fulfill_checkout(session, cart_code)


  return HttpResponse(status=200)


def fulfill_checkout(session, cart_code):
    
    order = Order.objects.create(stripe_checkout_id=session["id"],
        amount=session["amount_total"],
        currency=session["currency"],
        customer_email=session["customer_email"],
        status="Paid")
    

    print(session)


    cart = Cart.objects.get(cart_code=cart_code)
    cartitems = cart.cartitems.all()

    for item in cartitems:
        orderitem = OrderItem.objects.create(order=order, product=item.product, 
                                             quantity=item.quantity)
    
    cart.delete()
    
    
    
@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")
    
    cart = Cart.objects.filter(cart_code=cart_code).first()
    product = Product.objects.get(id=product_id)
    
    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

    return Response({'product_in_cart': product_exists_in_cart})


@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.filter(cart_code=cart_code).first()

    if cart:
        serializer = SimpleCartSerializer(cart)
        return Response(serializer.data)
    return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def my_wishlists(request):
    email = request.query_params.get("email")
    wishlists = Wishlist.objects.filter(user__email=email)
    serializer = WishlistSerializer(wishlists, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def product_in_wishlist(request):
    email = request.query_params.get("email")
    product_id = request.query_params.get("product_id")

    if Wishlist.objects.filter(product__id=product_id, user__email=email).exists():
        return Response({"product_in_wishlist": True})
    return Response({"product_in_wishlist": False})


@api_view(['GET'])
def get_cart(request, cart_code):
    cart = Cart.objects.filter(cart_code=cart_code).first()
    
    if cart:
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_orders(request):
    email = request.query_params.get("email")
    orders = Order.objects.filter(customer_email=email)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def add_address(request):
    email = request.data.get("email")
    street = request.data.get("street")
    city = request.data.get("city")
    state = request.data.get("state")
    phone = request.data.get("phone")

    if not email:
        return Response({"error": "Email is required"}, status=400)
    
    customer = User.objects.get(email=email)

    address, created = CustomerAddress.objects.get_or_create(
        customer=customer)
    address.email = email 
    address.street = street 
    address.city = city 
    address.state = state
    address.phone = phone 
    address.save()

    serializer = CustomerAddressSerializer(address)
    return Response(serializer.data)


@api_view(["GET"])
def get_address(request):
    email = request.query_params.get("email") 
    address = CustomerAddress.objects.filter(customer__email=email)
    if address.exists():
        address = address.last()
        serializer = CustomerAddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "Address not found"}, status=200)
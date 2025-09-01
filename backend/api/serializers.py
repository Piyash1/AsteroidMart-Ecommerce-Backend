from rest_framework import serializers  # pyright: ignore[reportMissingImports]
from .models import *
from django.contrib.auth import get_user_model

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'image', 'price']

class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = ['average_rating', 'total_reviews']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture_url']


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'comment', 'created_at', 'updated_at']


class ProductDetailSerializer(serializers.ModelSerializer):
    rating = ProductRatingSerializer(read_only=True, allow_null=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    similar_products = serializers.SerializerMethodField()
    poor_review = serializers.SerializerMethodField()
    fair_review = serializers.SerializerMethodField()
    good_review = serializers.SerializerMethodField()
    very_good_review = serializers.SerializerMethodField()
    excellent_review = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'slug', 'image', 'price', 'rating', 'reviews', 'similar_products',
            'poor_review', 'fair_review', 'good_review', 'very_good_review', 'excellent_review'
        ]

    def get_poor_review(self, obj):
        return obj.reviews.filter(rating=1).count()

    def get_fair_review(self, obj):
        return obj.reviews.filter(rating=2).count()

    def get_good_review(self, obj):
        return obj.reviews.filter(rating=3).count()

    def get_very_good_review(self, obj):
        return obj.reviews.filter(rating=4).count()

    def get_excellent_review(self, obj):
        return obj.reviews.filter(rating=5).count()

    def get_similar_products(self, obj):
        if obj.category_id:
            products = Product.objects.filter(category=obj.category_id).exclude(id=obj.id)[:8]
            return ProductListSerializer(products, many=True).data
        return []


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image', 'slug']        
        
class CategoryDetailSerializer(serializers.ModelSerializer):
    products = ProductListSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'image', 'products']
        
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True) 
    sub_total = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'sub_total']
        
    def get_sub_total(self, cartitem):
        total = cartitem.product.price * cartitem.quantity
        return total
    
class CartSerializer(serializers.ModelSerializer):
    cartitems = CartItemSerializer(many=True, read_only=True)
    cart_total = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ['id', 'cart_code', 'cartitems', 'cart_total']
        
    def get_cart_total(self, cart):
       items = cart.cartitems.all()
       total = sum([item.product.price * item.quantity for item in items])
       return total
   
class CartStatSerializer(serializers.ModelSerializer):
    total_quantity = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ['id', 'cart_code', 'total_quantity']
        
    def get_total_quantity(self, cart):
       items = cart.cartitems.all()
       total = sum([item.quantity for item in items])
       return total
   
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture_url']
        
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'comment', 'created_at', 'updated_at']
        
        
class WishlistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    product = ProductListSerializer(read_only=True)
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'product', 'created']
        
        
class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart 
        fields = ["id", "cart_code", "num_of_items"]

    def get_num_of_items(self, cart):
        num_of_items = sum([item.quantity for item in cart.cartitems.all()])
        return num_of_items
    

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = ["id", "quantity", "product"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(read_only=True, many=True)
    class Meta:
        model = Order 
        fields = ["id", "stripe_checkout_id", "amount", "items", "status", "created_at"]



class CustomerAddressSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    class Meta:
        model = CustomerAddress
        fields = "__all__"
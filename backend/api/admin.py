from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# Register your models here.

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name')
admin.site.register(CustomUser, CustomUserAdmin)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'featured')
admin.site.register(Product, ProductAdmin)    


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
admin.site.register(Category, CategoryAdmin) 

class ReviewAdmin(admin.ModelAdmin):
    list_display = ["product", "user", "rating", "comment", "created_at", "updated_at"]
    list_filter = ["rating", "created_at"]
    search_fields = ["product__name", "user__email", "comment"]
    readonly_fields = ["created_at", "updated_at"]
admin.site.register(Review, ReviewAdmin)  

class CartAdmin(admin.ModelAdmin):
    list_display = ("cart_code",)
admin.site.register(Cart, CartAdmin)


class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity")
admin.site.register(CartItem, CartItemAdmin)


class ProductRatingAdmin(admin.ModelAdmin):
    list_display = ("product", "average_rating", "total_reviews")
admin.site.register(ProductRating, ProductRatingAdmin)


class WishlistAdmin(admin.ModelAdmin):
    list_display = ("user", "product")
admin.site.register(Wishlist, WishlistAdmin) 

admin.site.register([Order, OrderItem, CustomerAddress])

        

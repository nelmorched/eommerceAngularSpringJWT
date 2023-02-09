package com.ecommerce.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.ShoppingCart;
import com.ecommerce.model.UserApp;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.ShoppingCartRepository;

@Service
public class ShoppingCartService {

	@Autowired
	private ShoppingCartRepository shoppingCartRepository;
	@Autowired
	private CartItemRepository cartItemRepository;
	
	public ShoppingCart addIItemToCart(Product product, UserApp userApp , int quantity) {
		ShoppingCart shoppingCart  = userApp.getShoppingCart();
		if(shoppingCart== null) {
			shoppingCart=new ShoppingCart();
		}
		Set<CartItem>cartItems = shoppingCart.getCartItem();
		CartItem item = findCartItem(cartItems, product.getId());
		if(cartItems==null) {
			cartItems=new HashSet<>();
			if(item==null) {
				 item= new CartItem();
				 item.setProduct(product);
				 item.setQuantity(quantity);
				 item.setShoppingCart(shoppingCart);
				 item.setTotalPrice(quantity * product.getActPrice());
				cartItems.add(item);
				cartItemRepository.save(item);
			}
		}
		else {
			if(item==null) {
				item= new CartItem();
				item.setProduct(product);
				item.setQuantity(quantity);
				item.setShoppingCart(shoppingCart);
				item.setTotalPrice(quantity * product.getActPrice());
				cartItems.add(item);
				cartItemRepository.save(item);
			}else {
				item.setQuantity(quantity);
				item.setTotalPrice(quantity);
				cartItemRepository.save(item);
			}
			
		}
		shoppingCart.setCartItem(cartItems);
		int totalItem=totalItem(shoppingCart.getCartItem());
		double totalPrice=totalPrice(shoppingCart.getCartItem());
		shoppingCart.setTotalItem(totalItem); 
		shoppingCart.setTotalPrice(totalPrice);
		shoppingCart.setUserApp(userApp);
		return shoppingCartRepository.save(shoppingCart);
		}
	
	
	
	
	private int totalItem(Set<CartItem> cartItems) {
		int totalItem = 0;
		for(CartItem item :  cartItems) {
			totalItem+=item.getQuantity();
		}
		return totalItem;
	}
	
	
	
	private double totalPrice(Set<CartItem>cartItems) {
		double totalPrice = 0;
		for(CartItem item : cartItems) {
			totalPrice+=item.getTotalPrice();
		}
		return totalPrice;
	} 
	private CartItem findCartItem(Set<CartItem>items , Long id) {
		if(items == null) {
			return null;
		}
		CartItem cartItem =null;
				for(CartItem item : items) {
					if(item.getProduct().getId() == id)
					{
						cartItem=item;
					}
				}
				return cartItem;
	}
	
	
	
}

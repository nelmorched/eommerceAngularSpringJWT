package com.ecommerce.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Product;
import com.ecommerce.model.ShoppingCart;
import com.ecommerce.model.UserApp;
import com.ecommerce.repository.UserAppRepository;
import com.ecommerce.service.ProductService;
import com.ecommerce.service.ShoppingCartService;

@RestController
public class CartController {
	@Autowired
	private ProductService productService;
	@Autowired
	private ShoppingCartService shoppingCartService;
	@Autowired
	private UserAppRepository userAppRepository;

	@PostMapping(value = "product/addToCart")
	public ShoppingCart addItemToCart(@RequestParam("id") Long id,
			@RequestParam(value="quantity", required=false , defaultValue = "1" )int quantity ,UserApp userApp) {
		
				 userApp = userAppRepository.findByUserName(userApp.getUserName());
				Product product= productService.findById(id);
				return shoppingCartService.addIItemToCart(product, userApp, quantity);
		
	}
}

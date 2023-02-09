package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.config.ApplicationRequestFilter;
import com.ecommerce.model.OrderDetails;
import com.ecommerce.model.OrderInput;
import com.ecommerce.model.OrderProductQte;
import com.ecommerce.model.Product;
import com.ecommerce.model.UserApp;
import com.ecommerce.repository.OrderDetailsRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserAppRepository;
@Service
public class OrderDetailsService {
	
private static final  String ORDER_STATUS= "PLACED";
	@Autowired
	private OrderDetailsRepository orderDetailsRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private UserAppRepository userAppRepository;
	
	public void placeOrder(OrderInput orderInput) {
		List<OrderProductQte>orderProductQtes= orderInput.getProductQtes();
		for( OrderProductQte orderProductQte: orderProductQtes) {
			String userName = ApplicationRequestFilter.CURRENT_USER;
			UserApp userApp = userAppRepository.findByUserName(userName);
			Product  product= productRepository.findById(orderProductQte.getId()).get();
			

			OrderDetails orderDetails = new OrderDetails( 
					orderInput.getFullName()
					, orderInput.getFullAdresse(),
					orderInput.getContactNumber(), 
					orderInput.getAltContactNumber()
					, ORDER_STATUS
					,orderProductQte.getQuantity() *product.getPrice(),
					product,
					userApp);
			orderDetailsRepository.save(orderDetails);

		}
		
	}

}

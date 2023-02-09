package com.ecommerce.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetails {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idOrder;
	private String orderFullName;
	private String orderFullAdresse;
	private String orderContactNumber;
	private String orderAltcontactNumber;
	private String orderStatus;
	private double orderAmount;
	@OneToOne
	private Product  product;
	@OneToOne
	private UserApp userApp;
	public OrderDetails(String orderFullName, String orderFullAdresse, String orderContactNumber,
			String orderAltcontactNumber, String orderStatus, double orderAmount, Product product, UserApp userApp) {
		super();
		this.orderFullName = orderFullName;
		this.orderFullAdresse = orderFullAdresse;
		this.orderContactNumber = orderContactNumber;
		this.orderAltcontactNumber = orderAltcontactNumber;
		this.orderStatus = orderStatus;
		this.orderAmount = orderAmount;
		
		this.product = product;
		
		this.userApp = userApp;
	}

	
}

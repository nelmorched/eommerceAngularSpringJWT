package com.ecommerce.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class OrderInput {

	private String fullName;
	private String fullAdresse;
	private String contactNumber;
	private String altContactNumber;
	private List<OrderProductQte> productQtes;
	public OrderInput(String fullName, String fullAdresse, String contactNumber, String altContactNumber,
			List<OrderProductQte> productQtes) {
		super();
		this.fullName = fullName;
		this.fullAdresse = fullAdresse;
		this.contactNumber = contactNumber;
		this.altContactNumber = altContactNumber;
		this.productQtes = productQtes;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getFullAdresse() {
		return fullAdresse;
	}
	public void setFullAdresse(String fullAdresse) {
		this.fullAdresse = fullAdresse;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getAltContactNumber() {
		return altContactNumber;
	}
	public void setAltContactNumber(String altContactNumber) {
		this.altContactNumber = altContactNumber;
	}
	public List<OrderProductQte> getProductQtes() {
		return productQtes;
	}
	public void setProductQtes(List<OrderProductQte> productQtes) {
		this.productQtes = productQtes;
	}
	
}

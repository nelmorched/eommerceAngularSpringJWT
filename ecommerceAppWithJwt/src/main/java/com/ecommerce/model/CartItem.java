package com.ecommerce.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor@NoArgsConstructor
public class CartItem {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long idcart;
private int quantity;
private double totalPrice;

@ManyToOne(fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
@JoinColumn(name = "idShoppingCart" , referencedColumnName = "idShoppingCart" )
private ShoppingCart shoppingCart;


@OneToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "id", referencedColumnName = "id")
private Product product;
}

package com.ecommerce.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor@AllArgsConstructor
public class ShoppingCart {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long idShoppingCart;
private double totalItem, totalPrice;

@OneToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "idUser", referencedColumnName = "idUser")
private	UserApp userApp;
@OneToMany(cascade = CascadeType.ALL,mappedBy = "shoppingCart")
private Set<CartItem> cartItem;
}

package com.ecommerce.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
public class UserApp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idUser;
    private String userName;
	private String userFirstName;
	private String userLastName;
	private String userPassword;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@JoinTable(name= "USER_ROLE",
	      joinColumns = {@JoinColumn(name= "ID_USER")
	      },
	     inverseJoinColumns = {
			@JoinColumn(name = "ID_ROLE")
	})
	private Set<Role> role;
	
	@OneToOne(mappedBy = "userApp")
	private ShoppingCart shoppingCart;
}

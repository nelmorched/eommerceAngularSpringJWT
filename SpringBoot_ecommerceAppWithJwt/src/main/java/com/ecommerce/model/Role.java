package com.ecommerce.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
public class Role {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRole;
	private String roleName;
	
	private String descRole;
}

package com.ecommerce.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BrandProduct" , uniqueConstraints = @UniqueConstraint(columnNames = "nameBrand"))
public class BrandProduct {
	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "id_brand")
	   private Long id_brand;
	   private String nameBrand;
	public BrandProduct(String nameBrand) {
		
		this.nameBrand = nameBrand;
	}
	   
}

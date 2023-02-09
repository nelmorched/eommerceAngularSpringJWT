package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.BrandProduct;
@Repository
public interface BrandProductRepository extends JpaRepository<BrandProduct, Long> {
	
	 BrandProduct findByNameBrand(String nameBrand);
	 
	
}

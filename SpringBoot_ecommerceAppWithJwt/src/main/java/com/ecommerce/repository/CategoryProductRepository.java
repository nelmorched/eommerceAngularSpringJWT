package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.model.CategoryProduct;

public interface CategoryProductRepository  extends JpaRepository<CategoryProduct, Long>{
	
CategoryProduct findByName(String name);
}

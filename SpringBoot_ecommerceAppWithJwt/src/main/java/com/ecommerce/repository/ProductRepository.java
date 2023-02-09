package com.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.model.Product;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long>{
 
	Product findByProductName(String productName);
	 @Query(value = "SELECT p FROM Product p where p.etat=true")
	 List<Product> findByEtat();
	
	   @Query(value = "select * from commercial_jwt.product p inner join commercial_jwt.category_product c on c.id_cat = p.id_cat where p.id_cat = ?1", nativeQuery = true)
		List<Product>allproductBycategory(Long id_cat);
	   @Query(value = "select * from commercial_jwt.product p inner join commercial_jwt.brand_product b on b.id_brand = p.id_brand where p.id_brand = ?1", nativeQuery = true)
	   List<Product> allproductByBrand(Long id_brand);
}

package com.ecommerce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;

@Service
public class ProductService {
@Autowired
	private ProductRepository productRepository;
	
	public List<Product>findAll(){
		return productRepository.findAll();
	}
	
	public Product addNewProduct(Product product) {
		return productRepository.save(product);
	}
	
	public Product findById(Long id) {
		return productRepository.findById(id).get();
	}
	public Product updateProduct(Product product) {
		Product  producUpdate=productRepository.findById(product.getId()).get();
		return productRepository.save(producUpdate);
	}
	public Product findByProductName(String productName) {
		return productRepository.findByProductName(productName);
	}

	public void enable(Long id) {
	Product	productDelet =	 productRepository.findById(id).get();
	productDelet.setEtat(false);
		productRepository.save(productDelet);;
		
	}
	public void disable(Long id) {
		Product	productDelet =	 productRepository.findById(id).get();
		productDelet.setEtat(true);
		productRepository.save(productDelet);;
			
		}
	public List<Product> getAllProductByEtat(){
		return productRepository.findByEtat();
	}
	public List<Product> findAllByCaegory(Long id_cat){
		return productRepository.allproductBycategory(id_cat);
	}
	public List<Product> findAllByBrand(Long id_brand){
		return productRepository.allproductByBrand(id_brand);
	}
	public List<Product> getProductDetails(boolean isSingleProductsheckOut , Long id ){
		if(isSingleProductsheckOut) {
			
			List<Product> list= new ArrayList<>();
			
			Product product = productRepository.findById(id).get();
			list.add(product);
			return list;
		}else {
		
	}
		return new ArrayList<>();
}
}
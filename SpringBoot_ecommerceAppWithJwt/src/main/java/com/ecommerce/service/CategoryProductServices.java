package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.BrandProduct;
import com.ecommerce.model.CategoryProduct;
import com.ecommerce.repository.CategoryProductRepository;
import com.ecommerce.validateur.BrandProductValidateur;
import com.ecommerce.validateur.CategoryValidateur;

import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
public class CategoryProductServices {
@Autowired
private CategoryProductRepository categoryProductRepository; 

	 public CategoryProduct save(CategoryProduct categoryProduct) throws Exception {
		 List<String> errer = CategoryValidateur.VALIDATEUR(categoryProduct);
		 if(!errer.isEmpty()) {
			 log.error(" brand product have errer");
			 throw new Exception();
		 }
		
		 return categoryProductRepository.save(categoryProduct);
			 
		 
	 }
	
	 
	 
	 public List<CategoryProduct>listAllCategoryProduct(){
		 return categoryProductRepository.findAll();
	 }
	 public CategoryProduct findById(Long id_cat){
		 if(id_cat== null) {
			 log.error("product id not found ");
			 return null;
		 }
		 try {
			return categoryProductRepository.findById(id_cat).orElseThrow(() -> new Exception());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			 return null;
		}
	 }
	 public void deleteCategoryById(Long id_cat) {
		 if(id_cat== null) {
			 log.error("product id not found ");
			 return ;
		 } 
		 categoryProductRepository.deleteById(id_cat);
	 }
}

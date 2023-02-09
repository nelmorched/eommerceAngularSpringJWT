package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.CategoryProduct;
import com.ecommerce.repository.CategoryProductRepository;
import com.ecommerce.service.CategoryProductServices;

@RestController
public class CategoryController {
	@Autowired
private CategoryProductServices categoryProductServices;
	@Autowired
	private CategoryProductRepository categoryProductRepository;
	@PostMapping(value = "/category/add")
	public CategoryProduct save(@RequestBody CategoryProduct categoryProduct) throws Exception {
		if(categoryProductRepository.findByName(categoryProduct.getName()) == null) {
			return categoryProductServices.save(categoryProduct);
		}else {
			System.out.println("errer already exist");
			return null;
		}
		
	}
	
	@GetMapping(value = "/category/all")
	public List<CategoryProduct>listAllCategoryProduct(){
		return categoryProductServices.listAllCategoryProduct();
	}
	@GetMapping(value = "/category/{id_cat}")
	public CategoryProduct findByIDCategory(@PathVariable Long id_cat) {
		return categoryProductServices.findById(id_cat);
	}
	@DeleteMapping(value = "/category/delete/{id_cat}")
	public void deleteCategory(@PathVariable Long id_cat) {
		categoryProductServices.deleteCategoryById(id_cat);
	}
	//user 
	@GetMapping(value="/category/allCategoryForUser")
	public List<CategoryProduct> allCaegoryForUser(){
 			return categoryProductServices.listAllCategoryProduct();
}
	@GetMapping(value = "/category/User/{id_cat}")
	public CategoryProduct findByIDCategoryUser(@PathVariable Long id_cat) {
		return categoryProductServices.findById(id_cat);
	}
	
}

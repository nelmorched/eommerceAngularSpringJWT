package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.BrandProduct;
import com.ecommerce.model.CategoryProduct;
import com.ecommerce.repository.BrandProductRepository;
import com.ecommerce.service.BrandProductServices;

@RestController
public class BrandProductController {
	@Autowired
private BrandProductServices brandProductServices;
	@Autowired
	private BrandProductRepository brandProductRepository;

@PostMapping(value = "/brandProduct/add")
public BrandProduct saveBrandProduct(@RequestBody BrandProduct brandProduct) throws Exception {
		if(brandProductRepository.findByNameBrand(brandProduct.getNameBrand()) == null) {
		     return brandProductServices.save(brandProduct);
		     
		}else {
			System.out.println("errer brand already exist");
			return null;
		}
	
	
}

@GetMapping(value = "/brandProduct/all")
public List<BrandProduct>listAllBrandProduct(){
	return brandProductServices.listAllBrandProduct();
}
@GetMapping(value = "/brandProduct/{id_brand}")
public BrandProduct findbYid(@PathVariable("id_brand") Long id_brand){
	return brandProductServices.findById(id_brand);
}

@DeleteMapping(value = "/brandProduct/delete/{id_brand}")
public void deleteByID(@PathVariable("id_brand") Long id_brand){
	 brandProductServices.deleteBrandById(id_brand);
}
@GetMapping(value = "/brandProduct/User/{id_brand}")
public BrandProduct findByIDBrandUser(@PathVariable("id_brand") Long id_brand) {
	return brandProductServices.findById(id_brand);
}
@GetMapping(value="/brandProduct/allBrandForUser")
public List<BrandProduct> allBrandForUser(){
			return brandProductServices.listAllBrandProduct();
}
}

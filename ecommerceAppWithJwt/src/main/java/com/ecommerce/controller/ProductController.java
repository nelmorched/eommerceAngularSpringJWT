package com.ecommerce.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.model.ImageModel;
import com.ecommerce.model.Product;
import com.ecommerce.service.BrandProductServices;
import com.ecommerce.service.CategoryProductServices;
import com.ecommerce.service.ProductService;

@RestController
public class ProductController {
@Autowired
private ProductService productService;
@Autowired
private CategoryProductServices categoryProductServices;
@Autowired
private BrandProductServices brandProductServices;
//admin roles
@PostMapping(value = "/product/add" , consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
public Product addNewProduct(@RequestPart("product") Product product,
								@RequestPart("imageFile") MultipartFile[] multipartFile) {

	try {
	Set<ImageModel>imageModels=	uploadImage(multipartFile);
		product.setProductImages(imageModels);
		product.setCategory(categoryProductServices.findById(product.getCategory().getId_cat()));
		product.setBrandProduct(brandProductServices.findById(product.getBrandProduct().getId_brand()));
		return productService.addNewProduct(product);
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
}
public Set<ImageModel> uploadImage(MultipartFile[] multipartFile) throws IOException {
	Set<ImageModel>imageModels= new HashSet<>();
	for(MultipartFile file :multipartFile ) {
		ImageModel imageModel = new ImageModel(
				file.getOriginalFilename(),
				file.getContentType(),
				file.getBytes()
				
				);
		imageModels.add(imageModel);
		
	}
	return imageModels;
}
@GetMapping(value="/product/all")
public List<Product>getAllProduct(){
	return productService.findAll();
}
@GetMapping(value="/product/{id}")
public Product getProduct(@PathVariable("id") Long id){
	return productService.findById(id);
}
@DeleteMapping(value = "/product/enable/{id}")
public void enableproduct(@PathVariable("id") Long id) {
	productService.enable(id);
}
@DeleteMapping(value = "/product/disable/{id}")
public void disableproduct(@PathVariable("id") Long id) {
	productService.disable(id);
}
@GetMapping(value="/product/allbyetat")
public List<Product>getAllProductByEtat(){
	return productService.getAllProductByEtat();
}
@GetMapping(value="/product/allbycaegory/{id_cat}")
public List<Product>getAllProductBycategory(@PathVariable("id_cat") Long id_cat){
	return productService.findAllByCaegory(id_cat);
}
@GetMapping(value="/product/allbyBrand/{id_brand}")
public List<Product>getAllProductByBrand(@PathVariable("id_brand") Long id_brand){
	return productService.findAllByBrand(id_brand);
}
@GetMapping(value="/product/User/{id}")
public Product getProductUser(@PathVariable("id") Long id){
	return productService.findById(id);
}
@GetMapping(value = "/product/{id}/{isSingleProductsheckOut}")
@PreAuthorize(value = "hasRole('User')")
public List<Product> getProductByIdAAndIsSingleSheckout(
								 @PathVariable("isSingleProductsheckOut") boolean isSingleProductsheckOut 
								, @PathVariable("id") Long id  
		){
	return productService.getProductDetails(isSingleProductsheckOut, id);
	
}

}

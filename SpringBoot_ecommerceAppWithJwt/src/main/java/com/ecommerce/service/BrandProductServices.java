package com.ecommerce.service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.BrandProduct;
import com.ecommerce.repository.BrandProductRepository;
import com.ecommerce.validateur.BrandProductValidateur;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BrandProductServices {
@Autowired
	 private BrandProductRepository brandProductRepository;
	 
	 public BrandProduct save(BrandProduct brandProduct) throws Exception {
		 List<String> errer = BrandProductValidateur.VALIDATEUR(brandProduct);
		 if(!errer.isEmpty()) {
			 log.error(" brand product have errer");
			 throw new Exception();
		 }
		 return brandProductRepository.save(brandProduct);
	 }
	 public List<BrandProduct>listAllBrandProduct(){
		 return brandProductRepository.findAll();
	 }
	 public BrandProduct findById(Long id_brand){
		 if(id_brand== null) {
			 log.error("product id not found ");
			 return null;
		 }
		 try {
			return brandProductRepository.findById(id_brand).orElseThrow(() -> new Exception());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			 return null;
		}
	 }
	 public void deleteBrandById(Long id_brand) {
		 if(id_brand== null) {
			 log.error("product id not found ");
			 return ;
		 } 
		 brandProductRepository.deleteById(id_brand);
	 }
}

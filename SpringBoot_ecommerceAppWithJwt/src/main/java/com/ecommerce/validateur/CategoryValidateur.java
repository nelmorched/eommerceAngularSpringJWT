package com.ecommerce.validateur;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.ecommerce.model.CategoryProduct;

public class CategoryValidateur {

	public static List<String> VALIDATEUR(CategoryProduct categoryProduct){
		List<String> errer= new ArrayList<>();
		
		 if(categoryProduct == null) { 
		
		     errer.add("category Name shold not be null");
		     return errer; }
		
		if(!StringUtils.hasLength(categoryProduct.getName())) {
			errer.add("brand name shold not be null");
			
		}
		return errer;
	}
}

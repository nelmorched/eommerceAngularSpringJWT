package com.ecommerce.validateur;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.ecommerce.model.BrandProduct;

import net.bytebuddy.asm.Advice.Return;



public class BrandProductValidateur {

	public static List<String> VALIDATEUR(BrandProduct brandProduct){
		List<String> errer= new ArrayList<>();
		
		 if(brandProduct == null) { 
		
		     errer.add("Brand Name shold not be null");
		     return errer; }
		
		if(!StringUtils.hasLength(brandProduct.getNameBrand())) {
			errer.add("brand name shold not be null");
			
		}
		return errer;
	}
}

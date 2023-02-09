package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Utils.JwtUtil;
import com.ecommerce.model.UserApp;
import com.ecommerce.model.auth.JwtRequest;
import com.ecommerce.model.auth.JwtResponse;
import com.ecommerce.repository.UserAppRepository;
import com.ecommerce.service.auth.ApplicationUserDetailsService;

@CrossOrigin

@RestController
public class jwtTokenController {
	
	@Autowired
	private UserAppRepository repository;
	
	 @Autowired
	  private AuthenticationManager authenticationManager;

	  @Autowired
	  private ApplicationUserDetailsService userDetailsService;

	  @Autowired
	  private JwtUtil jwtUtil;

	  @PostMapping("/login")
	  public ResponseEntity<JwtResponse> authenticate(@RequestBody JwtRequest request) {
	    authenticationManager.authenticate(
	        new UsernamePasswordAuthenticationToken(
	            request.getUserName(),
	            request.getUserPassword()
	        )
	    );
	    final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUserName());
        final UserApp user= repository.findByUserName(request.getUserName());
	    final String jwt = jwtUtil.generateToken(userDetails);

	    return ResponseEntity.ok(JwtResponse.builder().jwtAccessToken(jwt)
	    		.userApp(user).build());
	  }
	
	}


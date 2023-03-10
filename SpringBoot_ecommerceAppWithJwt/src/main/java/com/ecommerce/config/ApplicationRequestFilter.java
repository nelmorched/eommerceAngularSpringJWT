package com.ecommerce.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecommerce.Utils.JwtUtil;
import com.ecommerce.service.auth.ApplicationUserDetailsService;



@Component
public class ApplicationRequestFilter extends OncePerRequestFilter{
public static  String CURRENT_USER="";
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private ApplicationUserDetailsService applicationUserDetailsService;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
	    String userName = null;
	    String jwt = null;
	   if(authHeader != null && authHeader.startsWith("Bearer ")) {
	      jwt = authHeader.substring(7);
	      userName = jwtUtil.extractUsername(jwt);
	      CURRENT_USER=userName;
	    }

	    if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	      UserDetails userDetails = this.applicationUserDetailsService.loadUserByUsername(userName);
	      if (jwtUtil.validateToken(jwt, userDetails)) {
	        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
	            userDetails, null, userDetails.getAuthorities()
	        );
	        usernamePasswordAuthenticationToken.setDetails(
	            new WebAuthenticationDetailsSource().buildDetails(request)
	        );
	        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	      }
	    }
	  
	    filterChain.doFilter(request, response);
	  }
	}




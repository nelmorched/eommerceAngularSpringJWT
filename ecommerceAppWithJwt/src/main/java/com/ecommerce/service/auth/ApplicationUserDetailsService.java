package com.ecommerce.service.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.jaas.AuthorityGranter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.model.UserApp;
import com.ecommerce.repository.UserAppRepository;



@Service
public class ApplicationUserDetailsService implements UserDetailsService{

	@Autowired
	private UserAppRepository userAppRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username)  throws UsernameNotFoundException{
		UserApp utilisateur=userAppRepository.findByUserName(username);
	
		if(utilisateur == null) {
		throw new UsernameNotFoundException("utilisateur not found in the data base"+username);
}
		
		return new User(
				utilisateur.getUserName(),
				utilisateur.getUserPassword(),
				utilisateur.getRole(). stream()
                .map(role ->
                new SimpleGrantedAuthority("ROLE_"+role.getRoleName()))
                  .collect(Collectors
                     .toList()));
		
	}
	
	

}

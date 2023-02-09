package com.ecommerce.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Role;
import com.ecommerce.model.UserApp;
import com.ecommerce.repository.RoleRepository;
import com.ecommerce.repository.UserAppRepository;

@Service
public class UserAppService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserAppRepository userAppRepository;
	@Autowired
	private RoleRepository roleRepository;
	
	public UserApp registerNeUser(UserApp userApp) {
		UserApp userSaved = userAppRepository.findByUserName(userApp.getUserName());
		if(userSaved == null) {
		Role role= roleRepository.findByRoleName("User");
		Set<Role> roleUser = new HashSet<>();
		roleUser.add(role);
		userApp.setRole(roleUser);
		userApp.setUserPassword(passwordEncoder.encode(userApp.getUserPassword()));
		return userAppRepository.save(userApp);
		}else {
			return null;
		}
	}
	public UserApp addAdmin(UserApp userApp) {
		Role role= roleRepository.findByRoleName("Admin");
		Set<Role> roleAdmin = new HashSet<>();
		roleAdmin.add(role);
		userApp.setRole(roleAdmin);
		userApp.setUserPassword(passwordEncoder.encode(userApp.getUserPassword()));
		return userAppRepository.save(userApp);
	}
	public UserApp findById(Long idUser) {
		return userAppRepository.findById(idUser).get();
	}
	public void initSve() {
		
		/*
		 * Role roleAdmin = new Role(); roleAdmin.setRoleName("Admin");
		 * roleAdmin.setDescRole("role for Admin "); roleRepository.save(roleAdmin);
		 * 
		 * ////////////////////////////
		 * 
		 * Role roleUser = new Role(); roleUser.setRoleName("User");
		 * roleUser.setDescRole("role for newly user"); roleRepository.save(roleUser);
		 * 
		 * UserApp adminUser= new UserApp(); adminUser.setUserFirstName("nassreddine");
		 * adminUser.setUserLastName("elmorched"); adminUser.setUserName("test@test");
		 * adminUser.setUserPassword(passwordEncoder.encode("0000"));
		 * Set<Role>adminRole= new HashSet<>(); adminRole.add(roleAdmin);
		 * adminUser.setRole(adminRole); userAppRepository.save(adminUser);
		 * 
		 * 
		 * UserApp user= new UserApp(); user.setUserFirstName("nassreddine");
		 * user.setUserLastName("elmorched"); user.setUserName("elmorched");
		 * user.setUserPassword(passwordEncoder.encode("0000")); Set<Role>userRole= new
		 * HashSet<>(); userRole.add(roleUser); user.setRole(userRole);
		 * userAppRepository.save(user);
		 */
		 
	}
	
	public UserApp getUserByName(String name) {
		return userAppRepository.findByUserName(name);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

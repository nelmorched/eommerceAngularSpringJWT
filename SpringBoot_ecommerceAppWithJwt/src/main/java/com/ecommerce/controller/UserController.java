package com.ecommerce.controller;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.model.Role;
import com.ecommerce.model.UserApp;
import com.ecommerce.repository.RoleRepository;
import com.ecommerce.repository.UserAppRepository;
import com.ecommerce.service.UserAppService;

@RestController
@CrossOrigin
public class UserController {
	private UserAppService userAppService;
	@Autowired
	public UserController( UserAppService userAppService) {
      this.userAppService =userAppService;	
      }
	@PostConstruct
	public void initRoleANdUser() {
		userAppService.initSve();
	}
	
	@PostMapping({"/registerNewUser"})
	public UserApp register(@RequestBody UserApp userApp) {
		return userAppService.registerNeUser(userApp);
	}
	@PostMapping({"/addAdmin"})
	public UserApp addAdmin(@RequestBody UserApp userApp) {
		return userAppService.addAdmin(userApp);
	}
	
	
	
	@GetMapping({"/forAdmin"})
	@PreAuthorize(value = "hasRole('Admin')")
	public String forAdmin() {
	
		return "access by admin olny ";
		}
	
	
	@GetMapping({"/forUser"})
	@PreAuthorize(value = "hasRole('User')")
   public String forUser() {
		
		return "access by any user have authentication ";
		}
	

}

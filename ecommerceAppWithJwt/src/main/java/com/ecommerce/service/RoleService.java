package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.model.Role;
import com.ecommerce.repository.RoleRepository;

@Service
public class RoleService {
@Autowired
	private RoleRepository roleRepo;

public Role createNewRole(Role role) {
	return roleRepo.save(role);
}
}

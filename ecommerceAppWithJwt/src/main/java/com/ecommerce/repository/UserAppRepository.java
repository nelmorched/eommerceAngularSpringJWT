package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.model.UserApp;

public interface UserAppRepository extends JpaRepository<UserApp, Long>{

UserApp findByUserName(String userName);
}

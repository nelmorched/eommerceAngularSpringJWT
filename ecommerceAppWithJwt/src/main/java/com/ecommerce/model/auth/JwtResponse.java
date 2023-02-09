package com.ecommerce.model.auth;

import com.ecommerce.model.UserApp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {

	private String jwtAccessToken;
	private UserApp userApp;
}

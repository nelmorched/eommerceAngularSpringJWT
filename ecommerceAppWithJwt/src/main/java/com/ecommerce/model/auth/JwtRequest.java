package com.ecommerce.model.auth;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class JwtRequest {

	private String userName;
	private String userPassword;

}

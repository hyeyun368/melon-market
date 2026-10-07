package com.melonmarket.backend.common;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Value("${FRONTEND_URL:}")
	private String frontendUrl;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		List<String> origins = new ArrayList<>();
		origins.add("http://localhost:5173");
		if (!frontendUrl.isBlank()) {
			origins.add(frontendUrl.trim());
		}

		registry.addMapping("/api/**")
				.allowedOrigins(origins.toArray(String[]::new))
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
	}

}

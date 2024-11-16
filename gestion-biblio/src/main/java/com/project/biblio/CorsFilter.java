package com.project.biblio;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

@Provider
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        // Allow only specific origins
        String origin = requestContext.getHeaderString("Origin");
        if (isAllowedOrigin(origin)) {
            responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
        }

        // Allow specific methods
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

        // Allow specific headers
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // Handle preflight caching
        responseContext.getHeaders().add("Access-Control-Max-Age", "3600"); // Cache preflight response for 1 hour
    }

    private boolean isAllowedOrigin(String origin) {
        // Define allowed origins (you can add more domains as needed)
        return origin != null && (origin.equals("https://trusted-site.com") || origin.equals("https://another-trusted-site.com"));
    }
}

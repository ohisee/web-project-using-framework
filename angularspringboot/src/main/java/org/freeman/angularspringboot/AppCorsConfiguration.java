/**
 * 
 */
package org.freeman.angularspringboot;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * This is CORS configuration
 *
 */
@Configuration
public class AppCorsConfiguration {

  private static final Logger LOG =
      LoggerFactory.getLogger(AppCorsConfiguration.class.getSimpleName());

  /**
   * CORS configuration
   * 
   * @return CorsConfigurationSource
   */
  @Bean(name = "corsConfigurationSource")
  CorsConfigurationSource corsConfigurationSource() {
    LOG.info("======cors web====== {}, {}, {}", apiPath, allowedOrigin, allowedHeaders);
    List<String> methods = Arrays
        .asList(Arrays.stream(allowedMethods.split(",")).map(String::trim).toArray(String[]::new));
    List<String> headers = Arrays
        .asList(Arrays.stream(allowedHeaders.split(",")).map(String::trim).toArray(String[]::new));
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(Arrays.asList(allowedOrigin));
    corsConfiguration.setAllowedMethods(methods);
    corsConfiguration.setAllowedHeaders(headers);
    corsConfiguration.setMaxAge(1800L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration(apiPath, corsConfiguration);
    return source;
  }

  /*
   * Properties setter
   */
  @Value("${allowed.path}")
  private String apiPath;

  @Value("${allowed.origin}")
  private String allowedOrigin;

  @Value("${allowed.headers}")
  private String allowedHeaders;

  @Value("${allowed.methods}")
  private String allowedMethods;

}

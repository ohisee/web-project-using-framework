/**
 * 
 */
package org.freeman.angularspringboot;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * This is Web Configuration
 *
 */
@Configuration
@EnableWebMvc
public class WebConfiguration extends WebMvcConfigurerAdapter {

  private static Logger LOG = LoggerFactory.getLogger("WebConfiguration");

  /**
   * @param registry
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    LOG.info("======configure web======");
    String[] methods =
        Arrays.stream(allowedMethods.split(",")).map(String::trim).toArray(String[]::new);
    String[] headers =
        Arrays.stream(allowedHeaders.split(",")).map(String::trim).toArray(String[]::new);
    LOG.info("======configure web====== {}, {}, {}", apiPath, allowedOrigin, allowedHeaders);
    registry.addMapping(apiPath).allowedOrigins(allowedOrigin).allowedMethods(methods)
        .allowedHeaders(headers).allowCredentials(true).maxAge(1800);
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

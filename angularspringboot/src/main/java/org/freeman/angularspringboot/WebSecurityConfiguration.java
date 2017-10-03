/**
 * 
 */
package org.freeman.angularspringboot;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * This is web security configuration
 *
 */
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

  private static final Logger LOG = LoggerFactory.getLogger("WebSecurity");

  public static final String UNRESTRICTED_URL_PING = "/im";

  /**
   * Configure CSRF token using cookie based token repository.
   * 
   * <code>
   * .and().addFilter(new CsrfFilter(new CookieCsrfTokenRepository()));
   * super.configure(http);
   * </code>
   * 
   * By default uses a Bean by the name of corsConfigurationSource {@link AppCorsConfiguration}
   * 
   * @param http
   */
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    LOG.info("======Checking======");
    http.cors().and().csrf()
        .requireCsrfProtectionMatcher(
            new CsrfRequireRequestMatcher(Arrays.asList(UNRESTRICTED_URL_PING)))
        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
        .exceptionHandling().accessDeniedHandler(new CsrfAccessDeniedHandler());
  }

}

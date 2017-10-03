/**
 * 
 */
package org.freeman.angularspringboot;

import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * This is rest controller class
 *
 */
@RestController
public class AppController {

  private static final Logger LOG = LoggerFactory.getLogger(AppController.class.getSimpleName());

  /**
   * Return CSRF token
   * 
   * Add @CrossOrigin annotation when using {@link WebConfiguration}
   * 
   * Update to add CORS configuration in Web Configuration {@link WebSecurityConfiguration} inside
   * HTTP security to avoid sending CSRF cookie
   * 
   * @return CSRF token
   */
  @RequestMapping(path = "/im", method = {RequestMethod.GET})
  public Object csrf(CsrfToken csrfToken) {
    LOG.info("======received======");
    return csrfToken;
  }

  /**
   * Return a simple string
   * 
   * @return a simple string
   */
  @RequestMapping(path = "/ping", method = {RequestMethod.GET})
  public Object ping(@RequestHeader HttpHeaders headers) {
    LOG.info("======ping======");
    headers.forEach((header, values) -> {
      LOG.info("{} - {}", header,
          (values != null) ? values.stream().collect(Collectors.joining(", ")) : "");
    });
    return new Answer<String>("able to see");
  }

}

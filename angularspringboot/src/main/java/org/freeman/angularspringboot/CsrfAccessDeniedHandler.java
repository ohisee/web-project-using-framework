/**
 * 
 */
package org.freeman.angularspringboot;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

/**
 * This is a custom CSRF access denied handler.
 *
 */
public class CsrfAccessDeniedHandler implements AccessDeniedHandler {

  private final static Logger LOG =
      LoggerFactory.getLogger(CsrfAccessDeniedHandler.class.getSimpleName());

  /**
   * Handle invalid CSRF token, limit error message
   * 
   * @param request
   * @param response
   * @param accessDeniedException
   */
  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
      AccessDeniedException accessDeniedException) throws IOException, ServletException {
    LOG.info("Found invalid credentials");
    if (!response.isCommitted()) {
      response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid credentials");
    }
  }

}

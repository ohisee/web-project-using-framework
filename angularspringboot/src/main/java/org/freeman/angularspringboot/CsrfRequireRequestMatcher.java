/**
 * 
 */
package org.freeman.angularspringboot;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.web.util.matcher.RequestMatcher;

/**
 * This is CSRF require request matcher
 *
 */
public class CsrfRequireRequestMatcher implements RequestMatcher {

  private final static Logger LOG =
      LoggerFactory.getLogger(CsrfRequireRequestMatcher.class.getSimpleName());

  private final List<Pattern> unrestrictedUrlsPattern;

  public CsrfRequireRequestMatcher(List<String> unrestrictedUrls) {
    this.unrestrictedUrlsPattern = new ArrayList<>();
    unrestrictedUrls.forEach((up) -> {
      this.unrestrictedUrlsPattern.add(Pattern.compile(up));
    });
  }

  /**
   * Match Request
   * 
   * <code>
   * Enumeration<String> names = request.getHeaderNames(); 
   * while (names.hasMoreElements()) { 
   *   String name = names.nextElement(); 
   *   LOG.info("{} - {}", name, request.getHeader(name)); 
   * }
   * </code>
   * 
   * @param request
   */
  @Override
  public boolean matches(HttpServletRequest request) {
    String uri = request.getRequestURI(), method = request.getMethod();
    LOG.info("====== Matching request ====== {}, {}", method, uri);
    return isUriMatching(uri);
  }

  /**
   * @param uri
   * @return true if there is a match or false for unrestricted
   */
  private boolean isUriMatching(String uri) {
    Iterator<Pattern> iterator = this.unrestrictedUrlsPattern.iterator();
    while (iterator.hasNext()) {
      if (iterator.next().matcher(uri).matches()) {
        return Boolean.FALSE;
      }
    }
    return Boolean.TRUE;
  }

}

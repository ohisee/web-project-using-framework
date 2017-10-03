package org.freeman.angularspringboot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * This is main class
 *
 */
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class AngularspringbootApplication {

  private static Logger LOG =
      LoggerFactory.getLogger(AngularspringbootApplication.class.getSimpleName());

  public static void main(String[] args) {
    LOG.info("Spring Boo Web App");
    SpringApplication.run(AngularspringbootApplication.class, args);
  }
}

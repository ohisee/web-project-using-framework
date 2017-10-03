/**
 * 
 */
package org.freeman.angularspringboot;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * This is an answer.
 *
 */
public class Answer<T> {

  private T data;

  @JsonInclude(value = Include.NON_NULL)
  private String id;

  public Answer(T data) {
    super();
    this.data = data;
  }

  public Answer(T data, String id) {
    super();
    this.data = data;
    this.id = id;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

}

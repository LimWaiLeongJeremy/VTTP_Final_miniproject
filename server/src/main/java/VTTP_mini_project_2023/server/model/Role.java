package VTTP_mini_project_2023.server.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Role {

  @Id
  private String role;

  private String description;

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}

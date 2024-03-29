package VTTP_mini_project_2023.server.model;

public class JwtResponse {

  private User user;
  private String jwtToken;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public String getJwtToken() {
    return jwtToken;
  }

  public void setJwtToken(String jwtToken) {
    this.jwtToken = jwtToken;
  }

  public JwtResponse(User user, String jwtToken) {
    this.user = user;
    this.jwtToken = jwtToken;
  }
}

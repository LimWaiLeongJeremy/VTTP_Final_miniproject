package VTTP_mini_project_2023.server.controller;

import VTTP_mini_project_2023.server.model.JwtRequest;
import VTTP_mini_project_2023.server.model.JwtResponse;
import VTTP_mini_project_2023.server.service.JwtService;
import java.nio.file.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin
public class JwtController {

  @Autowired
  private JwtService jwtSvc;

  @PostMapping({ "/authenticate" })
  public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest)
    throws Exception {
    return jwtSvc.createJwtToken(jwtRequest);
  }
}

package VTTP_mini_project_2023.server.controller;

import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.service.ItemService;
import VTTP_mini_project_2023.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api")
@CrossOrigin
public class GeneralRoleController {

  @Autowired
  private UserService userSvc;

  @Autowired
  private ItemService itemSvc;

  @PostMapping({ "/registerNewUser" })
  @ResponseBody
  public User registerNewUser(@RequestBody User user) {
    return userSvc.registerNewUser(user);
  }

  @GetMapping({ "/items" })
  @ResponseBody
  public ResponseEntity<String> getItem() {
    return ResponseEntity.ok(itemSvc.getItem().toString());
  }
}

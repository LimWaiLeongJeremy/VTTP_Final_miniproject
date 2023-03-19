package VTTP_mini_project_2023.server.controller;

import org.springframework.web.bind.annotation.RestController;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.service.ItemService;
import VTTP_mini_project_2023.server.service.UserService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api")
public class UserController {

    @Autowired
    private UserService userSvc;
    @Autowired
    private ItemService itemSvc;

    @PostConstruct
    public void initRolesAndUsers() {
        userSvc.initRolesAndUser();
    }

    @PostMapping({ "/registerNewUser" })
    @ResponseBody
    public User registerNewUser(@RequestBody User user) {
        return userSvc.registerNewUser(user);
    }

    @GetMapping({ "/forAdmin" })
    @PreAuthorize("hasRole('Admin')")
    @ResponseBody
    public ResponseEntity<String> forAdmin() {
        String good = "Welcome back Admin!";
        JsonObject jsonObject = Json.createObjectBuilder().add("message",
                good).build();
        String json = jsonObject.toString();
        return ResponseEntity.ok(json.toString());
    }

    @GetMapping({ "/forUser" })
    @PreAuthorize("hasRole('User')")
    @ResponseBody
    public ResponseEntity<String> forUser() {

        return ResponseEntity.ok(itemSvc.getItem().toString());
    }

}
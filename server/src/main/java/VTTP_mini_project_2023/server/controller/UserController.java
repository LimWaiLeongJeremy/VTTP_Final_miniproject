package VTTP_mini_project_2023.server.controller;

import org.springframework.web.bind.annotation.RestController;

import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.service.UserService;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class UserController {

    @Autowired
    private UserService userSvc;

    @PostConstruct
    public void initRolesAndUsers() {
        userSvc.initRolesAndUser();
    }

    @PostMapping({ "/registerNewUser" })
    public User registerNewUser(@RequestBody User user) {
        return userSvc.registerNewUser(user);
    }

    @GetMapping({ "/forAdmin" })
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin() {
        return "Welcome back Admin!";
    }

    @GetMapping({ "/forUser" })
    @PreAuthorize("hasRole('User')")
    public String forUser() {
        return "Welcome back User!";
    }

}
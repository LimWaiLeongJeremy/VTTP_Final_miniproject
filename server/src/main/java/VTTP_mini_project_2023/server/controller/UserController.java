package VTTP_mini_project_2023.server.controller;

import org.springframwork.web.bind.annotation.RestController;
import VTTP_mini_project_2023.server.service.UserService;
import org.springframwork.web.bind.annotation.PostMapping;
import VTTP_mini_project_2023.server.model.User;
import org.springframwork.web.bind.annotation.RequestBody;


@RestController
public class UserContoller {

    @Autowired
    private UserService userSvc;

    @PostMapping
    public User registerNewUser(@RequestBody User user) {
        return userSvc.registerNewUser(user);
    }
    
}
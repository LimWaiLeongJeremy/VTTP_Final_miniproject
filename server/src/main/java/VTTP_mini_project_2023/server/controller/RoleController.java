package VTTP_mini_project_2023.server.controller;

import VTTP_mini_project_2023.server.model.Role;
import VTTP_mini_project_2023.server.service.RoleService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class RoleController {

    @Autowired
    private RoleService roleSvc;

    @PostMapping({ "/createNewRole" })
    public Role createNewRole(@RequestBody Role role) {
        return roleSvc.createNewRole(role);
    }
}

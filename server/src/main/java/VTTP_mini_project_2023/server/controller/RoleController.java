package VTTP_mini_project_2023.server.controller;

import org.springframework.web.binb.annotation.controller;

import VTTP_mini_project_2023.server.model.Role;
import VTTP_mini_project_2023.server.service.RoleService;
import org.springframwork.web.bind.annotation.RestController;
import org.springframwork.beans.factory.annotation.Autowired;
import org.springframwork.web.bind.annotation.PostMapping;
import org.springframwork.web.bind.annotation.RequestBody;


@RestController
public class RoleController {

    @Autowired
    private RoleService roleSvc;

    @PostMapping({"/createNewRole"})
    public Role createNewRole(@RequestBody Role role) {
        return roleSvc.createNewRole(role);
    }
}

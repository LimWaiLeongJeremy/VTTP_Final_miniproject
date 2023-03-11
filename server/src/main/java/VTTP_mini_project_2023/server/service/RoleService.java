package VTTP_mini_project_2023.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import VTTP_mini_project_2023.server.model.Role;
import VTTP_mini_project_2023.server.repository.RoleRepository;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepo;

    public Role createNewRole(Role role) {
        return roleRepo.save(role);
    }
}

package VTTP_mini_project_2023.server.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import VTTP_mini_project_2023.server.model.Role;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.repository.RoleRepository;
import VTTP_mini_project_2023.server.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerNewUser(User user) {
        // TODO: handle if user exist
        Role role = roleRepo.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRole(roles);
        user.setPassword(encoderPassword(user.getPassword()));

        return userRepo.save(user);
    }

    public void initRolesAndUser() {
        Role adminRole = new Role();
        adminRole.setRole("Admin");
        adminRole.setDescription("Admin role");
        roleRepo.save(adminRole);

        Role userRole = new Role();
        userRole.setRole("User");
        userRole.setDescription("Default role");
        roleRepo.save(userRole);

        User adminUser = new User();
        adminUser.setFirstName("admin");
        adminUser.setLastName("admin");
        adminUser.setUserName("admin");
        adminUser.setEmail("jereremy19995@hotmail.sg");
        adminUser.setPassword(encoderPassword("admin"));
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userRepo.save(adminUser);

        User user = new User();
        user.setFirstName("tan");
        user.setLastName("ah gao");
        user.setUserName("tan");
        user.setEmail("jereremy19995@hotmail.sg");
        user.setPassword(encoderPassword("tan"));
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userRepo.save(user);
    }

    public String encoderPassword(String password) {
        return passwordEncoder.encode(password);
    }

    private String idGenerator() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    public String getEmailByUsername(String username) {
        return userRepo.getEmailByUsername(username);
    }
}

import org.springframework.web.binb.annotation.service;

import java.util.Set;

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

    public User registerNewUser(User user) {
        return userRepo.save(user);
    }

    public void initRolesAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleRepo.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role");
        roleRepo.save(userRole);

        User adminUser = new User();
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setUserName("admin");
        adminUser.setUserEmail("jereremy19995@hotmail.sg");
        adminUser.setUserPassword("admin");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        userRepo.save(adminUser);

        User user = new User();
        user.setUserFirstName("tan");
        user.setUserLastName("gaou");
        user.setUserName("tan");
        user.setUserEmail("jereremy19995@hotmail.sg");
        user.setUserPassword("tan");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        userRepo.save(user);
    }
}

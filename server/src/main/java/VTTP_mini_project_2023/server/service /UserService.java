import org.springframework.web.binb.annotation.service;

import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public User registerNewUser(User user) {
        return userRepo.save(user);
    }
}

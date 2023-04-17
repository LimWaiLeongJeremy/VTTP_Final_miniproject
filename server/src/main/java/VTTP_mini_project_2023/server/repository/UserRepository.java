package VTTP_mini_project_2023.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import VTTP_mini_project_2023.server.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    
    @Query(value="SELECT email FROM user WHERE user_name = ?;", nativeQuery= true)
    Optional<String> getEmailByUsername(String username);
}

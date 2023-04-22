package VTTP_mini_project_2023.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import VTTP_mini_project_2023.server.model.User;


@Repository
public interface UserRepository extends CrudRepository<User, String> {
    
    @Query(value="SELECT email FROM user WHERE user_name = ?;", nativeQuery= true)
    String getEmailByUsername(String username);
}

package VTTP_mini_project_2023.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import VTTP_mini_project_2023.server.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

}

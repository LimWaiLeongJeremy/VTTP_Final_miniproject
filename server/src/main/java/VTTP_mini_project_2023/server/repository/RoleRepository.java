package VTTP_mini_project_2023.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import VTTP_mini_project_2023.server.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

}

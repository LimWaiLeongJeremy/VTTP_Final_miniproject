package VTTP_mini_project_2023.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import static VTTP_mini_project_2023.server.repository.Queries.*;


@Repository
public class CartRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int insertIntoCart(Item item, User user) {
        return jdbcTemplate.update(SQL_INSERT_INTO_CART
                ,item.getId()
                ,user.getFirstName()
                ,item.getItemName()
        );
    }
}

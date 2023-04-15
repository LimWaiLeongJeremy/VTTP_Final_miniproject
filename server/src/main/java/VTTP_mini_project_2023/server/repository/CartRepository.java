package VTTP_mini_project_2023.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import static VTTP_mini_project_2023.server.repository.Queries.*;

import java.util.List;


@Repository
public class CartRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void insertIntoCart(List<Item> items, String userName) {
                // Stream - alternative to iteration
                List<Object[]> data = items.stream()
                .map(li -> {
                    Object[] l = new Object[3];
                    l[0] = li.getId();
                    l[1] = li.getQuantity();
                    l[2] = userName;
                    return l;
                })
                .toList();
    
            // Batch update
            jdbcTemplate.batchUpdate(SQL_INSERT_INTO_CART, data);
        
    }
}

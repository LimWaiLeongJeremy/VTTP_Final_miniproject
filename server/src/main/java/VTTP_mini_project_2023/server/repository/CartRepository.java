package VTTP_mini_project_2023.server.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import VTTP_mini_project_2023.server.model.Cart;
import VTTP_mini_project_2023.server.model.Item;
import static VTTP_mini_project_2023.server.repository.Queries.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;


@Repository
public class CartRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    // TODO: change userName -> username
    @Transactional
    public Optional<int[]> insertIntoCart(List<Item> items, String userName) {
        try {
            deleteByUsername(userName);
            List<Object[]> data = items.stream()
                    .map(li -> {
                        Object[] l = new Object[3];
                        l[0] = li.getId();
                        l[1] = li.getQuantity();
                        l[2] = userName;
                        return l;
                    })
                    .toList();
    
            int[] results = jdbcTemplate.batchUpdate(SQL_INSERT_INTO_CART, data);
            return Optional.of(results);
        } catch (DataAccessException e) {
            System.err.println(e);
            return Optional.empty();
        }
        
    }

    public List<Item> getUserCart(String userName) {
        final SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_CART_BY_USERNAME, userName);
        final List<Item> result = new LinkedList<>();
        while (rs.next()) { 
            result.add(Cart.setModelFromSql(rs));
        }
        return result;
    }
    
    public void deleteByUsername(String userName) {
        jdbcTemplate.update(SQL_DELETE_CART_BY_USERNAME, userName);
    }
}

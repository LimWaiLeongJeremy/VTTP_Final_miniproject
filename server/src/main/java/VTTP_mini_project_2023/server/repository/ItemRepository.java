package VTTP_mini_project_2023.server.repository;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import VTTP_mini_project_2023.server.model.Item;

import static VTTP_mini_project_2023.server.repository.Queries.*;

@Repository
public class ItemRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Item> getFromMySQL() {
        final SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_ALL_ITEM);
        final List<Item> result = new LinkedList<>();
        while (rs.next()) { 
            result.add(Item.setModelFromSql(rs));
        }
        return result;
    }

    public int insertIntoSQL(Item item) {
        return jdbcTemplate.update(SQL_INSERT_INTO_ITEM
                ,item.getId()
                ,item.getItemName()
                ,item.getEffect()
                ,item.getImage()
                ,item.getPrice()
                ,item.getQuantity());
    }
    
}

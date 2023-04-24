package VTTP_mini_project_2023.server.repository;

import static VTTP_mini_project_2023.server.repository.Queries.*;

import VTTP_mini_project_2023.server.model.Item;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

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

  public List<Item> getSelectedItemsFromMySQL(int limit, int Offset) {
    final SqlRowSet rs = jdbcTemplate.queryForRowSet(
      SQL_SELECT_ALL_ITEM_LIMIT_OFFSET,
      limit,
      Offset
    );
    final List<Item> result = new LinkedList<>();
    while (rs.next()) {
      result.add(Item.setModelFromSql(rs));
    }
    return result;
  }

  public int insertIntoSQL(Item item) {
    return jdbcTemplate.update(
      SQL_INSERT_INTO_ITEM,
      item.getId(),
      item.getItemName(),
      item.getEffect(),
      item.getImage(),
      item.getPrice(),
      item.getQuantity()
    );
  }

  public int updateItem(int price, int quantity, String itemID) {
    return jdbcTemplate.update(SQL_UPDATE_ITEM_TABLE, price, quantity, itemID);
  }

  public List<String> getCarouselImages() {
    final SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_SELECT_TOP_10_IMAGES);
    final List<String> result = new LinkedList<>();
    while (rs.next()) {
      result.add(rs.getString("image"));
    }
    return result;
  }

  public Item getById(String itemId) {
    final SqlRowSet rs = jdbcTemplate.queryForRowSet(
      SQL_SELECT_ITEM_BY_ID,
      itemId
    );
    final Item item = new Item();
    while (rs.next()) {
      item.getId();
      item.getItemName();
      item.getEffect();
      item.getImage();
      item.getPrice();
      item.getQuantity();
    }
    return item;
  }
}

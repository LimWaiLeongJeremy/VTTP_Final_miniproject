package VTTP_mini_project_2023.server.model;

import java.util.List;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

public class Cart {
    private String userName;
    private List<Item> cart;
    
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public List<Item> getCart() {
        return cart;
    }
    public void setCart(List<Item> cart) {
        this.cart = cart;
    }
    
    public static Item setModelFromSql(SqlRowSet rs) {
        Item i = new Item();
        i.setId(rs.getString("item_id"));
        i.setItemName(rs.getString("item_name"));
        i.setEffect(rs.getString("effect"));
        i.setPrice(rs.getFloat("price"));
        i.setQuantity(rs.getInt("quantity"));
        return i;
    }

    public static JsonArray setJArr(List<Item> items) {

        JsonArrayBuilder jArrBuilder = Json.createArrayBuilder();

        for (Item item : items) {
            JsonObject jObj = Json.createObjectBuilder()
                .add("id", item.getId())
                .add("itemName", item.getItemName())
                .add("effect", item.getEffect())
                .add("price", item.getPrice())
                .add("quantity", item.getQuantity())
                    .build();

            jArrBuilder.add(jObj);
        }
        JsonArray jArr = jArrBuilder.build();
        return jArr;
    }
}

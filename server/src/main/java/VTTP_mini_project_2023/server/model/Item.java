package VTTP_mini_project_2023.server.model;

import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

public class Item {
    private String id;
    private String itemName;
    private String effect;
    private String image;
    private float price;
    private int quantity;

    @Override
    public String toString() {
        return "Item [id=" + id + ", itemName=" + itemName + ", effect=" + effect + ", image=" + image + ", price="
                + price
                + ", quantity=" + quantity + "]";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int randomQuantity) {
        this.quantity = randomQuantity;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getEffect() {
        return effect;
    }

    public void setEffect(String effect) {
        this.effect = effect;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public static Item setJObj(JsonObject doc) {
        final Item item = new Item();

        item.setId(doc.getString("id"));
        item.setItemName(doc.getJsonObject("attributes").getString("name"));

        if (doc.getJsonObject("attributes").isNull("effect")) {
            item.setEffect("No effect");
        } else {
            item.setEffect(doc.getJsonObject("attributes").getString("effect"));
        }

        if (doc.getJsonObject("attributes").isNull("image")) {
            item.setImage("https://primefaces.org/cdn/primeng/images/usercard.png");
        } else {
            item.setImage(doc.getJsonObject("attributes").getString("image"));
        }

        Random rand = new Random();

        int randomPrice = rand.nextInt(100000) + 1;
        item.setPrice(randomPrice);

        int randomQuantity = rand.nextInt(100) + 1;
        item.setQuantity(randomQuantity);

        return item;
    }

    public static Item setModelFromSql(SqlRowSet rs) {
        Item i = new Item();
        i.setId(rs.getString("item_id"));
        i.setItemName(rs.getString("item_name"));
        i.setEffect(rs.getString("effect"));
        i.setImage(rs.getString("image"));
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
                    .add("image", item.getImage())
                    .add("price", item.getPrice())
                    .add("quantity", item.getQuantity())
                    .build();

            jArrBuilder.add(jObj);
        }
        JsonArray jArr = jArrBuilder.build();
        return jArr;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("itemName", itemName)
            .add("effect", effect)
            .add("image", image)
            .add("price", price)
            .add("quantity", quantity)
            .build();
    }

    public static Item fromCache(JsonObject doc) {

        final Item item = new Item();
        item.setId(doc.getString("id"));
        item.setItemName(doc.getString("itemName"));
        item.setEffect(doc.getString("effect"));
        item.setImage(doc.getString("image"));
        item.setPrice(doc.getInt("price"));
        item.setQuantity(doc.getInt("quantity"));
        return item;
    }
}
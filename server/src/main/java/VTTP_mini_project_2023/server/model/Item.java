package VTTP_mini_project_2023.server.model;

public class Item {
    private String id;
    private String itemName;
    private String effect;
    private String img;
    private float price;
    private String quantity;
    
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getQuantity() {
        return quantity;
    }
    public void setQuantity(String quantity) {
        this.quantity = quantity;
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
    public String getImg() {
        return img;
    }
    public void setImg(String img) {
        this.img = img;
    }
    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    
}

package VTTP_mini_project_2023.server.model;

import java.util.List;

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
    
}

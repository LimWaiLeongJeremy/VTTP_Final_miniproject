package VTTP_mini_project_2023.server.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import VTTP_mini_project_2023.server.model.Cart;
import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.repository.CartRepository;
import jakarta.json.JsonArray;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepo;

    public Optional<int[]> saveToCart (List<Item> items, String userName) {
        return cartRepo.insertIntoCart(items, userName);
    }

    public JsonArray getUserCart(String userName) {
        List<Item> items = new LinkedList<>();
        items = cartRepo.getUserCart(userName);

        return Cart.setJArr(items);
    }
}

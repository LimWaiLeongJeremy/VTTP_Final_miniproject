package VTTP_mini_project_2023.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.repository.CartRepository;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepo;

    public void saveToCart (List<Item> items, String userName) {
        cartRepo.insertIntoCart(items, userName);
    }
}

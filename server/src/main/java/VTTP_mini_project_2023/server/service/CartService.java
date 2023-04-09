package VTTP_mini_project_2023.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.repository.CartRepository;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepo;

    public int addToCart (Item item, User user) {
        return cartRepo.insertIntoCart(item, user);
    }
}

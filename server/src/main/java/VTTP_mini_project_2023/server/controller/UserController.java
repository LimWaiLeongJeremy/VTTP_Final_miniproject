package VTTP_mini_project_2023.server.controller;

import org.springframework.web.bind.annotation.RestController;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.service.CartService;
import VTTP_mini_project_2023.server.service.ItemService;
import VTTP_mini_project_2023.server.service.UserService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api")
public class UserController {

    @Autowired
    private UserService userSvc;
    @Autowired
    private ItemService itemSvc;
    @Autowired
    private CartService cartSvc;

    @PostConstruct
    public void initRolesAndUsers() {
        userSvc.initRolesAndUser();
    }

    @PostMapping({ "/registerNewUser" })
    @ResponseBody
    public User registerNewUser(@RequestBody User user) {
        return userSvc.registerNewUser(user);
    }

    @PutMapping({ "/updateItem/{price}/{quantity}/{itemId}" })
    @PreAuthorize("hasRole('Admin')")
    @ResponseBody
    public ResponseEntity<Integer> updatepdateItem(@PathVariable int price, @PathVariable int quantity,
            @PathVariable String itemId) {
        return ResponseEntity.ok(itemSvc.updateItem(price, quantity, itemId));
    }

    @PostMapping(value = "/saveCart")
    @PreAuthorize("hasRole('User')")
    @ResponseBody
    public ResponseEntity<String> forUser() {
        System.out.println("here");
        // Item item = itemSvc.getById(itemId);
        // User user = new User();
        // item.setQuantity(quantity);
        // user.setUserName(userName);
        // System.out.println(carts.toString());
        String good = "endpoint hit";
        JsonObject jsonObject = Json.createObjectBuilder().add("message", good).build();
        String json = jsonObject.toString();

        return ResponseEntity.ok(json);
        // return ResponseEntity.ok(cartSvc.addToCart(item, user));
    }

    @GetMapping({ "/items" })
    @ResponseBody
    public ResponseEntity<String> getItem() {
        return ResponseEntity.ok(itemSvc.getItem().toString());
    }

}
package VTTP_mini_project_2023.server.controller;

import org.springframework.web.bind.annotation.RestController;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.service.CartService;
import VTTP_mini_project_2023.server.service.ItemService;
import VTTP_mini_project_2023.server.service.UserService;
import VTTP_mini_project_2023.server.util.JwtUtil;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

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
    @Autowired
    private JwtUtil jwtUtil;

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

    @PostMapping(path = {"/saveCart"}, consumes=MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasRole('User')")
    @ResponseBody
    public ResponseEntity<String> forUser(HttpServletRequest request, @RequestBody List<Item> cart) {
        String header = request.getHeader("Authorization");
        String jwtToken = header.substring(7);
        String userName = jwtUtil.getUserNameFromToken(jwtToken);

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (Item item : cart) {
            User user = new User();
            JsonObjectBuilder objectBuilder = Json.createObjectBuilder()
                .add("id", item.getId())
                .add("itemName", item.getItemName())
                .add("effect", item.getEffect())
                .add("image", item.getImage())
                .add("price", item.getPrice())
                .add("quantity", item.getQuantity());
                
            arrayBuilder.add(objectBuilder.build());
        }
        JsonArray jsonArray = arrayBuilder.build();
        cartSvc.addToCart(cart, userName);
        
        // Item item = itemSvc.getById(itemId);
        // User user = new User();
        // item.setQuantity(quantity);
        // user.setUserName(userName);
        // System.out.println(carts.toString());

        return ResponseEntity.ok(jsonArray.toString());
        // return ResponseEntity.ok(cartSvc.addToCart(item, user));
    }

    @GetMapping({ "/items" })
    @ResponseBody
    public ResponseEntity<String> getItem() {
        return ResponseEntity.ok(itemSvc.getItem().toString());
    }

}
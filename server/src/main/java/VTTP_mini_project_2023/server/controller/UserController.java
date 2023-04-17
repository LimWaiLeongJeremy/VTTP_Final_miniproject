package VTTP_mini_project_2023.server.controller;

import org.springframework.web.bind.annotation.RestController;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.model.User;
import VTTP_mini_project_2023.server.service.CartService;
import VTTP_mini_project_2023.server.service.ItemService;
import VTTP_mini_project_2023.server.service.UserService;
import VTTP_mini_project_2023.server.util.JwtUtil;
import VTTP_mini_project_2023.server.util.Mail;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

import java.util.List;
import java.util.Optional;

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
    @Autowired
    private Mail mail;

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
    public ResponseEntity<String> saveCart(HttpServletRequest request, @RequestBody List<Item> cart) {
        String header = request.getHeader("Authorization");
        String jwtToken = header.substring(7);
        String userName = jwtUtil.getUserNameFromToken(jwtToken);

        Optional<int[]> saveCart = cartSvc.saveToCart(cart, userName);
        if (saveCart.isEmpty()) {
            String good = "Error saving cart for user " + userName;
            JsonObject jsonObject = Json.createObjectBuilder().add("message", good).build();
            String json = jsonObject.toString();
            return ResponseEntity.ok(json);
        }

        String good = "Cart saved";
        JsonObject jsonObject = Json.createObjectBuilder().add("message", good).build();
        String json = jsonObject.toString();
        return ResponseEntity.ok(json);
    }

    @GetMapping({ "/items" })
    @ResponseBody
    public ResponseEntity<String> getItem() {
        return ResponseEntity.ok(itemSvc.getItem().toString());
    }

    @GetMapping({ "/userCart" })
    @PreAuthorize("hasRole('User')")
    @ResponseBody
    public ResponseEntity<String> getUserCart(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String jwtToken = header.substring(7);
        String userName = jwtUtil.getUserNameFromToken(jwtToken);
        System.out.println("get user cart: " + userName);
        return ResponseEntity.ok(cartSvc.getUserCart(userName).toString());
    }

    @GetMapping({ "/checkOut" })
    @PreAuthorize("hasRole('User')")
    @ResponseBody
    public ResponseEntity<String> checkOut(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String jwtToken = header.substring(7);
        String userName = jwtUtil.getUserNameFromToken(jwtToken);
        Optional<String> email = userSvc.getEmailByUsername(userName);
        System.out.println(">>>>> user email: " + email);
        mail.sendMail("jereremy19995@hotmail.sg");
        return ResponseEntity.ok("ok");
    }
}
package VTTP_mini_project_2023.server.controller;

import VTTP_mini_project_2023.server.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api")
@CrossOrigin
public class AdminController {

  @Autowired
  private ItemService itemSvc;

  @PutMapping({ "/updateItem/{price}/{quantity}/{itemId}" })
  @PreAuthorize("hasRole('Admin')")
  @ResponseBody
  public ResponseEntity<Integer> updatepdateItem(
    @PathVariable int price,
    @PathVariable int quantity,
    @PathVariable String itemId
  ) {
    return ResponseEntity.ok(itemSvc.updateItem(price, quantity, itemId));
  }
}

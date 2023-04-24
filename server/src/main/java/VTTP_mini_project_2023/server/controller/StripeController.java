package VTTP_mini_project_2023.server.controller;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.service.CartService;
import VTTP_mini_project_2023.server.util.JwtUtil;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.json.Json;
import jakarta.json.JsonBuilderFactory;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.spi.JsonProvider;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(originPatterns = "*")
public class StripeController {

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private CartService cartSvc;

  @Value("${stripe.publicKey}")
  private String publicKey;

  @Value("${stripe.secretKey}")
  private String secretKey;

  @PostMapping("/payment")
  @PreAuthorize("hasRole('User')")
  public String payment(HttpServletRequest request) throws StripeException {
    Stripe.apiKey = secretKey;

    String username = getUsername(request);
    List<Item> items = cartSvc.getCheckOut(username);
    List<SessionCreateParams.LineItem> lineItemList = new ArrayList<>();

    for (Item item : items) {
      lineItemList.add(buildSessionParam(item));
    }

    SessionCreateParams param = SessionCreateParams
        .builder()
        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
        .setMode(SessionCreateParams.Mode.PAYMENT)
        .setSuccessUrl("https://potter-potion.vercel.app/success")
        .setCancelUrl("https://potter-potion.vercel.app/checkOut")
        .addAllLineItem(lineItemList)
        .build();
    Session sess = Session.create(param);
    Map<String, String> respData = new HashMap<>();
    respData.put("id", sess.getId());

    JsonBuilderFactory factory = JsonProvider
        .provider()
        .createBuilderFactory(null);
    JsonObjectBuilder builder = factory.createObjectBuilder();
    for (Map.Entry<String, String> entry : respData.entrySet()) {
      builder.add(entry.getKey(), entry.getValue());
    }
    return (builder.build().toString());
  }

  @GetMapping({ "/getStripe" })
  @PreAuthorize("hasRole('User')")
  @ResponseBody
  public ResponseEntity<String> getSecret() {
    JsonObject jsonObject = Json
        .createObjectBuilder()
        .add("message", publicKey)
        .build();
    return ResponseEntity.ok(jsonObject.toString());
  }

  private String getUsername(HttpServletRequest request) {
    String header = request.getHeader("Authorization");
    String jwtToken = header.substring(7);
    return jwtUtil.getUserNameFromToken(jwtToken);
  }

  private SessionCreateParams.LineItem buildSessionParam(Item item) {
    return SessionCreateParams.LineItem
        .builder()
        .setQuantity(Long.valueOf(item.getQuantity()))
        .setPriceData(
            SessionCreateParams.LineItem.PriceData
                .builder()
                .setCurrency("SGD")
                .setUnitAmount((long) item.getPrice() * 100)
                .setProductData(
                    SessionCreateParams.LineItem.PriceData.ProductData
                        .builder()
                        .setName(item.getItemName())
                        .build())
                .build())
        .build();
  }
}

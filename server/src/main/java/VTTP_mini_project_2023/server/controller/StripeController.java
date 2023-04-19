package VTTP_mini_project_2023.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;


import VTTP_mini_project_2023.server.model.Item;
import jakarta.json.Json;
import jakarta.json.JsonBuilderFactory;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.spi.JsonProvider;


@RestController
@RequestMapping( value = "/api")
public class StripeController {

    @Value("${stripe.apikey}")
    private static String stripeKey;
    @Value("${stripe.secret}")
    private static String secret;


    @PostMapping("/payment")
    @PreAuthorize("hasRole('User')")
    public String payment(Item item) throws StripeException{
        System.out.println(">>>>>>>>>>>>>>>>>stripe apikey: " +stripeKey);
        Stripe.apiKey = stripeKey;
        SessionCreateParams param = SessionCreateParams.builder()
            .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:4200/success")
            .setCancelUrl("http://localhost:4200/cancel")
            .addLineItem(SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                    .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("SGD")
                        .setUnitAmount(2000L)
                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName("potion")
                        .build())
                    .build())
                .build())
            .build();
        Session sess = Session.create(param);
        Map<String, String> respData = new HashMap<>();
        respData.put("id", sess.getId());



        JsonBuilderFactory factory = JsonProvider.provider().createBuilderFactory(null);
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
        System.out.println(">>>> Stripe API KEY: " + stripeKey);
        System.out.println(">>>> Stripe secret: " + secret);
        JsonObject jsonObject = Json.createObjectBuilder().add("message", secret).build();
        return ResponseEntity.ok(jsonObject.toString());
    }

}

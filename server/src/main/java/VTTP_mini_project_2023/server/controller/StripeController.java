package VTTP_mini_project_2023.server.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;


import VTTP_mini_project_2023.server.model.Item;


@RestController
@RequestMapping( value = "/api")
public class StripeController {
    private static Gson gson = new Gson();

    @PostMapping("/payment")
    @PreAuthorize("hasRole('User')")
    public String payment(@RequestBody Item item) throws StripeException{
        stripeInit();
        SessionCreateParams param = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:4200/success")
                .setCancelUrl("http://localhost:4200/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder().setQuantity((long)item.getQuantity())
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("SGD")
                                .setUnitAmount((long)item.getPrice())
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData
                                .builder()
                                .setName(item.getItemName()).build())
                            .build())
                    .build())
            .build();
        Session sess = Session.create(param);
        Map<String, String> respData = new HashMap<>();
        respData.put("id", sess.getId());

        return gson.toJson(respData);

        // JsonBuilderFactory factory = JsonProvider.provider().createBuilderFactory(null);
        // JsonObjectBuilder builder = factory.createObjectBuilder();
        // for (Map.Entry<String, String> entry : respData.entrySet()) {
        //     builder.add(entry.getKey(), entry.getValue());
        // }
        
        // return (builder.build().toString());
    }

    private static void stripeInit() {
        Stripe.apiKey = "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";
    }
}


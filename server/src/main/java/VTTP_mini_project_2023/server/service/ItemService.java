package VTTP_mini_project_2023.server.service;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import VTTP_mini_project_2023.server.model.Item;

@Service
public class ItemService {

    public static final String POTTER_POTION_API_URL = "https://api.potterdb.com/v1/potions";

    public List<Item> getItem() {
        // call API
        RequestEntity<Void> req = RequestEntity
                .get(POTTER_POTION_API_URL)
                .accept(MediaType.APPLICATION_JSON)
                .build();
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = template.exchange(req, String.class);
        // get body from response
        String payload = resp.getBody();
        // set model 
        System.out.println(payload);
        return null;
    }

    // @Transactional
    // public List<Hero> search(int limit, int offset) {

    // // create the authentication signature
    // long timeStamp = System.currentTimeMillis();
    // String signature = "%d%s%s".formatted(timeStamp, privateKey, publicKey);
    // String hash = "";

    // // encrypt the signature with md5
    // try {
    // MessageDigest md5 = MessageDigest.getInstance("md5");
    // md5.update(signature.getBytes());
    // byte[] h = md5.digest();
    // hash = HexFormat.of().formatHex(h);
    // } catch (Exception e) {
    // // TODO: handle exception
    // }

    // // build the API URL
    // String url = UriComponentsBuilder.fromUriString(MARVEL_CHARATER_URL)
    // .queryParam("limit", limit)
    // .queryParam("offset", offset)
    // .queryParam("ts", timeStamp)
    // .queryParam("apikey", publicKey)
    // .queryParam("hash", hash)
    // .toUriString();

    // // Use the url to make a call to marvel
    // RequestEntity<Void> req = RequestEntity
    // .get(url)
    // .accept(MediaType.APPLICATION_JSON)
    // .build();
    // RestTemplate template = new RestTemplate();
    // ResponseEntity<String> resp = template.exchange(req, String.class);
    // String payload = resp.getBody();

    // // System.out.println("payload: " + payload);
    // // Parse the payload string to jsonObject
    // JsonReader reader = Json.createReader(new StringReader(payload));

    // // { data: { result: [ ] } }
    // JsonObject result = reader.readObject();
    // JsonArray data = result.getJsonObject("data").getJsonArray("results");

    // // Get id, name, description, image and set into model
    // List<Hero> superHero = new LinkedList<>();
    // for (int i = 0; i < data.size(); i++) {
    // superHero.add(Hero.setJObj(data.getJsonObject(i)));

    // // System.out.printf("service hit marvel endpoint, result index %d: %s\n", i,
    // superHero.get(i).toString());
    // }

    // return superHero;
    // // return null;

    // }

    // }

}

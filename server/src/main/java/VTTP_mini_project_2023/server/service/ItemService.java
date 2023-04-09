package VTTP_mini_project_2023.server.service;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import VTTP_mini_project_2023.server.model.Item;
import VTTP_mini_project_2023.server.repository.ItemCache;
import VTTP_mini_project_2023.server.repository.ItemRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepo;

    @Autowired
    private ItemCache itemCache;

    public static final String POTTER_POTION_API_URL = "https://api.potterdb.com/v1/potions";

    public JsonArray getItem() {
        List<Item> items = new LinkedList<>();
        Optional<List<Item>> cache = itemCache.get("potion");
        
        if(cache.isEmpty() && itemRepo.getFromMySQL().isEmpty()) {

            // if item not in cache or DB isert item and return value
            // call API
            System.out.println(">>>>>>>>item form API");
            RequestEntity<Void> req = RequestEntity
                    .get(POTTER_POTION_API_URL)
                    .accept(MediaType.APPLICATION_JSON)
                    .build();
            RestTemplate template = new RestTemplate();
            ResponseEntity<String> resp = template.exchange(req, String.class);
            // get body from response
            String payload = resp.getBody();
            JsonReader reader = Json.createReader(new StringReader(payload));
            JsonArray data = reader.readObject().getJsonArray("data");
            for (int i = 0; i < data.size(); i++) {
                // set model and insert item into items list 
                Item setModel = Item.setJObj(data.getJsonObject(i));
                // insert item into SQL
                itemRepo.insertIntoSQL(setModel);
                
                items.add(setModel);
            }
            System.out.println(">>>> save to SQL");
            // insert itemsinto cache
            itemCache.add("potion", items);
            System.out.println(">>>> save to redis");
        } else if (cache.isEmpty()) {
            // check if items exisit in db
            System.out.println(">>>>>>>>item form SQL");
            items = itemRepo.getFromMySQL();
            itemCache.add("potion", items);
            System.out.println(">>>> save to redis");

        } else {
            // check if item exist in cache
            System.out.println(">>>>>>>>item form Cache");
            items = cache.get();
        }

        return Item.setJArr(items);
        
    }

    public int updateItem(int price, int quantity, String itemID) {
        int updateItem = itemRepo.updateItem(price, quantity, itemID);

        if (itemCache.tableExist("potion")) {
            itemCache.del("potion");
            getItem();
        }
        return updateItem;
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

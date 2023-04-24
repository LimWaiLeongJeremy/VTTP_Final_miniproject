package VTTP_mini_project_2023.server.repository;

import VTTP_mini_project_2023.server.configuration.AppConfig;
import VTTP_mini_project_2023.server.model.Item;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import java.io.StringReader;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

@Repository
public class ItemCache {

  @Autowired
  @Qualifier(AppConfig.CACHE_ITEM)
  private RedisTemplate<String, String> redisTemplate;

  public void add(String key, List<Item> values) {
    ValueOperations<String, String> ops = redisTemplate.opsForValue();

    JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
    values
      .stream()
      .forEach(c -> {
        arrBuilder.add(c.toJson());
      });
    ops.set(key, arrBuilder.build().toString(), Duration.ofSeconds(300));
  }

  public Optional<List<Item>> get(String key) {
    ValueOperations<String, String> ops = redisTemplate.opsForValue();
    String value = ops.get(key);
    if (null == value) return Optional.empty();

    JsonReader reader = Json.createReader(new StringReader(value));
    JsonArray results = reader.readArray();

    List<Item> heros = results
      .stream()
      .map(v -> (JsonObject) v)
      .map(v -> Item.fromCache(v))
      .toList();

    return Optional.of(heros);
  }

  public void del(String key) {
    redisTemplate.delete(key);
  }

  public boolean tableExist(String key) {
    return redisTemplate.hasKey(key);
  }
}

USE E_Com;

DROP TABLE IF EXISTS cart;
CREATE TABLE "cart" (
  "cart_id" int NOT NULL AUTO_INCREMENT,
  "item_id" char(128) NOT NULL,
  "quantity" int DEFAULT '0',
  "user_name" char(255) NOT NULL,
  
  PRIMARY KEY ("cart_id"),
  KEY "item_id" ("item_id"),
  KEY "user_name" ("user_name"),
  CONSTRAINT "cart_ibfk_1" FOREIGN KEY ("item_id") REFERENCES "item" ("item_id"),
  CONSTRAINT "cart_ibfk_2" FOREIGN KEY ("user_name") REFERENCES "user" ("user_name")
);


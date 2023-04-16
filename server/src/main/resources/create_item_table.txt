USE E_Com;

DROP TABLE IF EXISTS item;
CREATE TABLE "item" (
  "item_id" char(128) NOT NULL,
  "item_name" varchar(128) NOT NULL,
  "effect" varchar(128) NOT NULL,
  "image" varchar(128) NOT NULL,
  "price" int NOT NULL,
  "quantity" int NOT NULL,
  
  PRIMARY KEY ("item_id")
);
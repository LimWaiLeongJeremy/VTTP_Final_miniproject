USE E_Com;

CREATE TABLE item (
    item_id CHAR(128) NOT NULL,
    item_name VARCHAR(128) NOT NULL,
    effect VARCHAR(128) NOT NULL,
    image VARCHAR(128) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,

    PRIMARY KEY(item_id)
);

-- create table cart (
--     cart_id int auto_increment not null,
--     item_id char(128) not null,
--     quantity int default '1',
--     user_name char(8) not null,

--     primary key(cart_id),
-- );
package VTTP_mini_project_2023.server.repository;

public class Queries {

    // for user 
    public static String SQL_SELECT_EMAIL_BY_USERNAME = "SELECT email FROM user WHERE user_name = ?;";
    // for item
    public static String SQL_SELECT_ALL_ITEM = "SELECT * FROM item;";
    public static String SQL_INSERT_INTO_ITEM = "INSERT INTO item VALUES (?, ?, ?, ?, ?, ?);";
    public static String SQL_UPDATE_ITEM_TABLE = "UPDATE `E_Com`.`item` SET `price` = ?, `quantity` = ? WHERE (`item_id` = ?);";
    public static String SQL_SELECT_ITEM_BY_ID = "SELECT * FROM item WHERE item_id = ?;";
    public static String SQL_SELECT_TOP_10_IMAGES = "SELECT image FROM item LIMIT 10";
    // for cart
    public static String SQL_INSERT_INTO_CART = "INSERT INTO cart (item_id, quantity, user_name) VALUES (?, ?, ?);";
    public static String SQL_DELETE_CART_BY_USERNAME = "DELETE FROM cart WHERE user_name = ?;";
    public static String SQL_SELECT_CART_BY_USERNAME = "SELECT * FROM userCartView WHERE user_name = ?;";
}

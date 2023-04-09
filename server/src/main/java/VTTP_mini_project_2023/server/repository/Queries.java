package VTTP_mini_project_2023.server.repository;

public class Queries {

    public static String SQL_SELECT_ALL_ITEM = "SELECT * FROM item;";
    public static String SQL_INSERT_INTO_ITEM = "INSERT INTO item VALUES (?, ?, ?, ?, ?, ?);";
    public static String SQL_UPDATE_ITEM_TABLE = "UPDATE `E_Com`.`item` SET `price` = ?, `quantity` = ? WHERE (`item_id` = ?);";
    
}

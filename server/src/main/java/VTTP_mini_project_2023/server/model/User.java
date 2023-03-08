package VTTP_mini_project_2023.server.model;

import javax.persistence.Entity;
import java.util.Set;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;

@Entity 
public class User {
    @Id
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String email;
    private String userPassword;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLE", 
        joinColumns = {
            @JoinColumns(name = "USER_ID")
        },
        inverseJoinColumns = {
            @JoinColumn(name = "ROLE_ID")
        }
    )
    private Set<Role> role;

    // TODO
    // getter and setter
}
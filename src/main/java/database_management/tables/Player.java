package database_management.tables;

public class Player {
    private String userName;
    private int id;
    private String password;
    public Player(String username, String password) {
        // this.id = id;
        this.userName = username;
        this.password = password;
    }
    public Player(){}

    public String getUserName() {
        return userName;
    }
    public String getPassword() {
        return password;
    }

    public int getId() {
        return id;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setId(int id) {
        this.id = id;
    }

}

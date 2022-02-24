package com.example.restservice;

public class Player {
    private final String username;
    private final String password;
    //private final int id;

    public Player(String username, String password) {
       // this.id = id;
        this.username = username;
        this.password = password;
    }

    public String getUserName() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    /*public int getId() {
        return id;
    }*/


}

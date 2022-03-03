package com.restservice;

public class Player {
    private String username;
    private String password;
    //private final int id;
    public Player(String username, String password) {
        // this.id = id;
        this.username = username;
        this.password = password;
    }
    public Player(){}
    public String getUserName() {
        return username;
    }
    public void setUserName(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    /*public int getId() {
        return id;
    }*/


}
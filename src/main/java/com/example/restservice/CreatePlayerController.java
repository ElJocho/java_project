package com.example.restservice;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;
import database_management.DBDao;

@RestController
public class CreatePlayerController {
    private final AtomicLong counter = new AtomicLong();

    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.platform}")
    private String platform;
    @Value("${spring.datasource.username}")
    private String db_username;
    @Value("${spring.datasource.password}")
    private String db_password;

    @GetMapping("/create_player")
    public Player player(@RequestParam(value = "username") String username, @RequestParam(value = "password") String password) {
        DBDao dao = new DBDao();
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(url);
        dataSource.setUsername(db_username);
        dataSource.setPassword(db_password);
        dataSource.setDriverClassName("org.postgresql.Driver");
        dao.setDataSource(dataSource);
        dao.create(username, password);
        return new Player(username, password);
    }
}

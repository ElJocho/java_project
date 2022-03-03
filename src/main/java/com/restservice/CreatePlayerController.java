package com.restservice;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    // Connect Interface to Postgres and return it
    public DBDao getDao(){
        DBDao dao = new DBDao();
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(url);
        dataSource.setUsername(db_username);
        dataSource.setPassword(db_password);
        dataSource.setDriverClassName("org.postgresql.Driver");
        dao.setDataSource(dataSource);
        return dao;
    }

    @CrossOrigin
    @PostMapping(value="/create_player", produces=MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Player player(@RequestBody ObjectNode objectNode) {
        String username = objectNode.get("username").asText();
        String password = objectNode.get("password").asText();
        DBDao dao = getDao();
        database_management.tables.Player player = dao.select(username).get(0);

        dao.create(username, password);
        return new Player(username, password);
    }
}

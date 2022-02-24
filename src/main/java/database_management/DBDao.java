package database_management;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;

import database_management.mapper.PlayerRowMapper;
import database_management.tables.Player;

public class DBDao implements Dao {
    private DataSource dataSource;
    private PlayerRowMapper playerRowMapper = new PlayerRowMapper();
    public void setDataSource(DataSource ds) {
        dataSource = ds;
    }

    public void create(String userName, String password) {
        JdbcTemplate insert = new JdbcTemplate(dataSource);
        insert.update("set search_path=imageguesser, public; INSERT INTO Player (username, password) VALUES(?,?)",
                new Object[] { userName, password });
    }

    public List<Player> select(int id) {
        JdbcTemplate select = new JdbcTemplate(dataSource);
        return select.query(
                        "set search_path=imageguesser, public; select  id, username, password from Player where id = ?",
                        playerRowMapper, new Object[]{id}
                );
    }

    public List<Player> selectAll() {
        JdbcTemplate select = new JdbcTemplate(dataSource);
        return select.query("set search_path=imageguesser, public; select FIRSTNAME, LASTNAME from PERSON",
                playerRowMapper);
    }

    public void deleteAll() {
        JdbcTemplate delete = new JdbcTemplate(dataSource);
        delete.update("set search_path=imageguesser, public; DELETE from Player");
    }

    public void delete(int id) {
        JdbcTemplate delete = new JdbcTemplate(dataSource);
        delete.update("set search_path=imageguesser, public; DELETE from Player where id = ?",
                new Object[] { id });
    }

}
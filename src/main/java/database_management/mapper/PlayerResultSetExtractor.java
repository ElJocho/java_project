package database_management.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.ResultSetExtractor;

import database_management.tables.Player;

public class PlayerResultSetExtractor implements ResultSetExtractor {
    @Override
    public Object extractData(ResultSet rs) throws SQLException {
        Player player = new Player();
        player.setUserName(rs.getString(1));
        player.setPassword(rs.getString(2));
        player.setId(Integer.parseInt(rs.getString(3)));
        return player;
    }

}
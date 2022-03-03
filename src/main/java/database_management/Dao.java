package database_management;
import java.util.List;

import javax.sql.DataSource;

import database_management.tables.Player;

public interface Dao {

    void setDataSource(DataSource ds);

    void create(String username, String password);

    List<Player> select(String username);

    List<Player> selectAll();

    void deleteAll();

    void delete(int id);
}

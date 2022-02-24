package database_management.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PlayerRowMapper implements RowMapper {
    @Override
    public Object mapRow(ResultSet rs, int line) throws SQLException {
        PlayerResultSetExtractor extractor = new PlayerResultSetExtractor();
        return extractor.extractData(rs);
    }
}
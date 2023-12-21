package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.ClimbingStyle;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Slf4j
@Component
public class JdbcClimbingStyleDao implements ClimbingStyleDao {
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<ClimbingStyle> getUserClimbingStyles(int userId) {
        String sql = "SELECT style_code, experience_level, has_gear, preferred " +
                "FROM user_styles " +
                "WHERE user_id = ?";
        List<ClimbingStyle> climbingStyles = new ArrayList<>();
        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, userId);
            while(rowSet.next()) {
                climbingStyles.add(mapRowSetToClimbingStyle(rowSet));
            }
        } catch (CannotGetJdbcConnectionException e) {
            log.debug("Error connecting to database. Error message: " + e.getMessage() + " "  + Arrays.toString(e.getStackTrace()));
            throw new DaoException("Error connecting to database. Error message: " + e.getMessage());
        }
        return climbingStyles;
    }

    private ClimbingStyle mapRowSetToClimbingStyle(SqlRowSet rowSet) {
        ClimbingStyle climbingStyle = new ClimbingStyle();
        climbingStyle.setStyleCode(Objects.requireNonNullElse(rowSet.getString("style_code"), null).charAt(0)); //this should never happen, but just in case
        climbingStyle.setExperienceLevel(rowSet.getString("experience_level"));
        climbingStyle.setHasGear(rowSet.getBoolean("has_gear"));
        climbingStyle.setPreferred(rowSet.getBoolean("preferred"));
        return climbingStyle;
    }
}

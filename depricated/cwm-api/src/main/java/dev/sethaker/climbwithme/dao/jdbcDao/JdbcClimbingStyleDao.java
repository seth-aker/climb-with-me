package dev.sethaker.climbwithme.dao.jdbcDao;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.ClimbingStyleDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.ClimbingStyle;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
@AllArgsConstructor
@Slf4j
public class JdbcClimbingStyleDao implements ClimbingStyleDao {
    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<ClimbingStyle> getUsersClimbingStyles(int userId) {
        List<ClimbingStyle> climbingStyles = new ArrayList<>();
        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet("SELECT * FROM get_user_climbing_styles(?)", userId);
            while(rowSet.next()) {
                climbingStyles.add(mapRowSetToClimbingStyle(rowSet));
            }
            return climbingStyles;
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }
    @Override
    public boolean insertClimbingStyle(ClimbingStyle userStyle, int userId) {
        try {
            return 1 == jdbcTemplate.queryForObject("SELECT * FROM insert_climbing_style(?,?,?,?,?,?)", int.class,
                    userStyle.getStyleCode(),
                    userId,
                    userStyle.getMaxGrade(),
                    userStyle.getIndoorOnly(),
                    userStyle.getIsPreferred(),
                    userStyle.getYearsExperience());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
//            throw new DaoException("An error occured inserting a new climbing style for user: " + userId);
        }

    }

    @Override
    public boolean updateClimbingStyle(ClimbingStyle userStyle, int userId) {
        try {
            return 1 == jdbcTemplate.queryForObject("SELECT * FROM update_climbing_style(?,?,?,?,?,?)", int.class,
                    userStyle.getStyleCode(),
                    userId,
                    userStyle.getMaxGrade(),
                    userStyle.getIndoorOnly(),
                    userStyle.getIsPreferred(),
                    userStyle.getYearsExperience());

        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    @Override
    public boolean deleteUserClimbingStyle(ClimbingStyle userStyle, int userId) {
        try {
            return 1 == jdbcTemplate.queryForObject("SELECT * FROM delete_climbing_style(?,?)", int.class,
                    userId, userStyle.getStyleCode());

        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    private ClimbingStyle mapRowSetToClimbingStyle(SqlRowSet rowSet) {
        ClimbingStyle climbingStyle = new ClimbingStyle();
        climbingStyle.setStyleCode(Objects.requireNonNull(rowSet.getString("style_code")).charAt(0));
        climbingStyle.setIndoorOnly(rowSet.getBoolean("indoor_only"));
        climbingStyle.setIsPreferred(rowSet.getBoolean("is_preferred"));
        climbingStyle.setMaxGrade(rowSet.getString("max_grade"));
        climbingStyle.setYearsExperience(rowSet.getString("years_experience"));
        return climbingStyle;
    }
}

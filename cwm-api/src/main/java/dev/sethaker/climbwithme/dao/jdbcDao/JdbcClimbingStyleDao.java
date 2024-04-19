package dev.sethaker.climbwithme.dao.jdbcDao;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.ClimbingStyleDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.ClimbingStyle;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Slf4j
public class JdbcClimbingStyleDao implements ClimbingStyleDao {
    private final JdbcTemplate jdbcTemplate;

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

}

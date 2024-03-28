package dev.sethaker.climbwithme.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

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
            return 1 == jdbcTemplate.update("CALL insert_climbing_style(?,?,?,?,?,?)",
                    userStyle.getStyleCode(),
                    userId,
                    userStyle.getMaxGrade(),
                    userStyle.getIndoorOnly(),
                    userStyle.getIsPreferred(),
                    userStyle.getYearsExperience());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new DaoException("An error occured inserting a new climbing style for user: " + userId);
        }

    }

}

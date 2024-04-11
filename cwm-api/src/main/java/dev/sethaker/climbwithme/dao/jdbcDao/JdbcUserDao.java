package dev.sethaker.climbwithme.dao.jdbcDao;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.UserDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Auth0User;
import dev.sethaker.climbwithme.model.User;

import lombok.extern.slf4j.Slf4j;

import javax.sql.DataSource;

@Component
@Slf4j
public class JdbcUserDao implements UserDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcUserDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public int getUserId(String authId) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM get_userID_by_authID(?)", int.class, authId);
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage());
        } catch (NullPointerException e) {
            log.error("Unrecognized AuthId: " + authId, e.getMessage(), e);
            throw new DaoException("Error retrieving user information");
        }
    }

    @Override
    public boolean createNewUser(Auth0User user) {
        try {
            // returns true when update method returns 1 row affected
            return 1 == jdbcTemplate.queryForObject("SELECT * FROM create_new_user (?,?,?,?,?,?,?,?,?,?,?,?,?)", int.class,
                    user.getAuthId(),
                    user.getCreatedAt(),
                    user.getEmail(),
                    user.getEmailVerified(),
                    user.getFamilyName(),
                    user.getGivenName(),
                    user.getLastPasswordReset(),
                    user.getFullName(),
                    user.getPhoneNumber(),
                    user.getPhoneVerified(),
                    user.getPicture(),
                    user.getUpdatedAt(),
                    user.getUsername());

        } catch (Exception e) {
            log.error("An error occurred creating new user", e);
            throw new DaoException("An error occurred creating new user");
        }

    }
    @Override
    public boolean updateUser(User user) {
        try {
            return 1 == jdbcTemplate.update("CALL update_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    getUserId(user.getAuthId()),
                    user.getFullName(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getEmailVerified(),
                    user.getDateOfBirth(),
                    user.getPrimaryPhone(),
                    user.getPhoneVerified(),
                    user.getCreatedAt(),
                    user.getGenderCode(),
                    user.getIsActive(),
                    user.getPicture(),
                    user.getWeightRange(),
                    user.getLastPasswordReset(),
                    user.getUsername());

        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage());
        }

    }
}

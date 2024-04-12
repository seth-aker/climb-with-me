package dev.sethaker.climbwithme.dao.jdbcDao;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.UserDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Auth0User;
import dev.sethaker.climbwithme.model.User;

import lombok.extern.slf4j.Slf4j;

import javax.sql.DataSource;
import java.util.Objects;

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

    public User getUser(String authId) {
        try {
            int userId = getUserId(authId);
            SqlRowSet results = jdbcTemplate.queryForRowSet("SELECT * FROM get_user_by_ID(?)", userId);
            if(results.next()) {
                return mapRowSetToUser(results);
            } else {
                throw new DaoException("Error, user not found");
            }
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage());
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
    public User updateUser(User user) {
        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet("SELECT * FROM update_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
            if(rowSet.next()) {
                return mapRowSetToUser(rowSet);
            } else {
                log.error("Rowset did not contain any results in JdbcUserDao.updateUser function");
                throw new DaoException("Error, user not found");
            }

        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage());
        }

    }

    private User mapRowSetToUser(SqlRowSet rowSet) {
        User user = new User();
        user.setAuthId(rowSet.getString("auth_id"));
        user.setUserId(rowSet.getInt("user_id"));
        user.setFullName(rowSet.getString("full_name"));
        user.setFirstName(rowSet.getString("given_name"));
        user.setLastName(rowSet.getString("family_name"));
        user.setEmail(rowSet.getString("email"));
        user.setEmailVerified(rowSet.getBoolean("email_verified"));
        if(Objects.nonNull(rowSet.getDate("date_of_birth"))) {
            user.setDateOfBirth(rowSet.getDate("date_of_birth").toLocalDate());
        }
        user.setPrimaryPhone(rowSet.getString("phone_number"));
        user.setPhoneVerified(rowSet.getBoolean("phone_verified"));
        if(Objects.nonNull(rowSet.getTimestamp("created_at"))) {
            user.setCreatedAt(rowSet.getTimestamp("created_at").toLocalDateTime());
        }
        if(Objects.nonNull(rowSet.getTimestamp("updated_at"))) {
            user.setUpdatedAt(rowSet.getTimestamp("updated_at").toLocalDateTime());
        }
        user.setGenderCode(rowSet.getString("gender_code"));
        user.setIsActive(rowSet.getBoolean("is_active"));
        user.setPicture(rowSet.getString("picture"));
        user.setWeightRange(rowSet.getString("weight_range"));
        if(Objects.nonNull(rowSet.getTimestamp("last_password_reset"))) {
            user.setLastPasswordReset(rowSet.getTimestamp("last_password_reset").toLocalDateTime());
        }
        user.setUsername(rowSet.getString("username"));
        return user;
    }
}

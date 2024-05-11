package dev.sethaker.climbwithme.dao.jdbcDao;

import dev.sethaker.climbwithme.model.PrivateUser;
import dev.sethaker.climbwithme.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.UserDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Auth0User;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.server.ResponseStatusException;

import javax.sql.DataSource;
import java.util.Objects;

@Component
@Slf4j
public class JdbcUserDao implements UserDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcUserDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    /**
     Returns the primary key of the users table using the authId.
     If the authId is not found, returns -1.
     */
    @Override
    public int getUserId(String authId) {
        try {
            return jdbcTemplate.queryForObject("SELECT * FROM get_userID_by_authID(?)", int.class, authId);
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage(), e);
        } catch (NullPointerException e) {
            log.error("Unrecognized AuthId: " + authId, e.getMessage(), e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public PrivateUser getUser(String authId) {
        try {
            int userId = getUserId(authId);
            SqlRowSet results = jdbcTemplate.queryForRowSet("SELECT * FROM get_user_by_ID(?)", userId);
            if(results.next()) {
                return mapRowSetToPrivateUser(results);
            } else {
                throw new DaoException("Error, user not found");
            }
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage());
        }
    }

    @Override
    public int getIdByUsername(String username) {
        try {
            return jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE username = ?", int.class, username);
        } catch (Exception e) {
            log.error("Username: " + username + " not found", e);
            return -1;
        }

    }

    @Override
    public User getPublicUser(String username) {
        try {
            int userId = getIdByUsername(username);
            SqlRowSet results = jdbcTemplate.queryForRowSet("SELECT * FROM get_user_by_ID(?)", userId);
            if(results.next()) {
                return mapRowSetToPublicUser(results);
            } else {
                throw new DaoException("Error, username: " + username + " not found");
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            //TODO: make error throw 403 unauthorized if isActive field is false;
            return null;
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
        } catch (DataAccessException | NullPointerException e) {
            log.error("An error occurred creating new user", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        } catch (Exception e) {
            log.error("An error occurred creating new user", e);
            HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            String message = "An error occurred creating new user";

            if(e.getMessage().contains("users_email_key")) {
                httpStatus = HttpStatus.FORBIDDEN;
                message = "The email address you submitted is already in use.";

            } else if (e.getMessage().contains("users_phone_number_key")) {
                httpStatus = HttpStatus.FORBIDDEN;
                message = "The phone number you submitted is already in use";

            } else if(e.getMessage().contains("users_username_key")) {
                httpStatus = HttpStatus.FORBIDDEN;
                message = "The username you submitted is already in use.";

            } else if (e.getMessage().contains("uc_auth_id")) {
                httpStatus = HttpStatus.FORBIDDEN;
                message = "This account already is registered";
            }

            throw new ResponseStatusException(httpStatus, message);
        }

    }
    @Override
    public PrivateUser updateUser(PrivateUser privateUser) {
        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet("SELECT * FROM update_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    getUserId(privateUser.getAuthId()),
                    privateUser.getFullName(),
                    privateUser.getFirstName(),
                    privateUser.getLastName(),
                    privateUser.getEmail(),
                    privateUser.getEmailVerified(),
                    privateUser.getDateOfBirth(),
                    privateUser.getPrimaryPhone(),
                    privateUser.getPhoneVerified(),
                    privateUser.getCreatedAt(),
                    privateUser.getGenderCode(),
                    privateUser.getIsActive(),
                    privateUser.getPicture(),
                    privateUser.getWeightRange(),
                    privateUser.getLastPasswordReset(),
                    privateUser.getUsername());
            if(rowSet.next()) {
                return mapRowSetToPrivateUser(rowSet);
            } else {
                log.error("Rowset did not contain any results in JdbcUserDao.updateUser function");
                throw new DaoException("Error, user not found");
            }

        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage());
        }

    }

    public boolean deactivateUser(String authId) {
        try {
            return jdbcTemplate.queryForObject("CALL deactivate_user(?)", Boolean.class, getUserId(authId));
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return false;
        } catch (NullPointerException e) {
            log.error("Error unpacking Boolean object from deactivate_user() function.", e);
            throw new DaoException("Error retrieving user information");
        }
    }


    private PrivateUser mapRowSetToPrivateUser(SqlRowSet rowSet) {
        PrivateUser privateUser = new PrivateUser();
        privateUser.setAuthId(rowSet.getString("auth_id"));
        privateUser.setUserId(rowSet.getInt("user_id"));
        privateUser.setFullName(rowSet.getString("full_name"));
        privateUser.setFirstName(rowSet.getString("given_name"));
        privateUser.setLastName(rowSet.getString("family_name"));
        privateUser.setEmail(rowSet.getString("email"));
        privateUser.setEmailVerified(rowSet.getBoolean("email_verified"));
        if(Objects.nonNull(rowSet.getDate("date_of_birth"))) {
            privateUser.setDateOfBirth(rowSet.getDate("date_of_birth").toLocalDate());
        }
        privateUser.setPrimaryPhone(rowSet.getString("phone_number"));
        privateUser.setPhoneVerified(rowSet.getBoolean("phone_verified"));
        if(Objects.nonNull(rowSet.getTimestamp("created_at"))) {
            privateUser.setCreatedAt(rowSet.getTimestamp("created_at").toLocalDateTime());
        }
        if(Objects.nonNull(rowSet.getTimestamp("updated_at"))) {
            privateUser.setUpdatedAt(rowSet.getTimestamp("updated_at").toLocalDateTime());
        }
        privateUser.setGenderCode(rowSet.getString("gender_code"));
        privateUser.setIsActive(rowSet.getBoolean("is_active"));
        privateUser.setPicture(rowSet.getString("picture"));
        privateUser.setWeightRange(rowSet.getString("weight_range"));
        if(Objects.nonNull(rowSet.getTimestamp("last_password_reset"))) {
            privateUser.setLastPasswordReset(rowSet.getTimestamp("last_password_reset").toLocalDateTime());
        }
        privateUser.setUsername(rowSet.getString("username"));
        return privateUser;
    }

    private User mapRowSetToPublicUser(SqlRowSet rowSet) {
        User user = new User();
        user.setUsername(rowSet.getString("username"));
        user.setFullName(rowSet.getString("full_name"));
        user.setFirstName(rowSet.getString("given_name"));
        user.setLastName(rowSet.getString("family_name"));
        user.setPicture(rowSet.getString("picture"));
        user.setGenderCode(rowSet.getString("gender_code"));
        return user;
    }
}

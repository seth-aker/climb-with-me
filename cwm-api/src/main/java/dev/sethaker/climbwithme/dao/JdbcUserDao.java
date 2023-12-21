package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Address;
import dev.sethaker.climbwithme.model.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;


@AllArgsConstructor
@Component
@Slf4j
public class JdbcUserDao implements UserDao {

    private JdbcTemplate jdbcTemplate;

    @Override
    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = ?";

        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, userId);
            if(rowSet.next()){
                return mapRowSetToUser(rowSet);
            } else {
                log.debug("User " + userId + " not found");
                throw new DaoException("User " + userId + " not found");
            }
        } catch (CannotGetJdbcConnectionException e){
            log.error("A connection could not be made to postgres.", e);
            throw new DaoException("Could not connect to server database");
        }
    }
    @Override
    public boolean createNewUser(User user) {
        String sql = "INSERT INTO users (auth_id, first_name, last_name, email, " +
                "email_verified, date_of_birth, primary_phone, created_on, gender_code, is_active, picture) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            int rowsReturned = jdbcTemplate.update(sql, user.getAuthId(), user.getFirstName(),
                    user.getLastName(), user.getEmail(), user.getEmailVerified(), user.getDateOfBirth(),
                    user.getPrimaryPhone(), user.getGenderCode(), user.getIsActive(), user.getPicture());
            if(rowsReturned != 1) {
                throw new DaoException("Insert did not return 1 row affected, returned: " + rowsReturned);
            }
            return true;
        } catch (CannotGetJdbcConnectionException e) {
            log.debug("Error connecting to database. Error message: " + e.getMessage() + " "  + Arrays.toString(e.getStackTrace()));
            throw new DaoException("Error connecting to database. Error message: " + e.getMessage());
        }
    }
    @Override
    public boolean updateUser(User user) {
        String sql = "UPDATE auth_id = ?, first_name = ?, last_name = ?, email = ?, " +
                "email_verified = ?, date_of_birth = ?, primary_phone = ?, created_on = ?, " +
                "gender_code = ?, is_active = ?, picture = ? " +
                "FROM users " +
                "WHERE user_id = ?";
        try {
            int rowsReturned = jdbcTemplate.update(sql, user.getAuthId(), user.getFirstName(),
                    user.getLastName(), user.getEmail(), user.getEmailVerified(), user.getDateOfBirth(),
                    user.getPrimaryPhone(), user.getCreatedOn(), user.getGenderCode(),
                    user.getIsActive(), user.getPicture(), user.getUserId());
            if(rowsReturned != 1) {
                throw new DaoException("Insert did not return 1 row affected, returned: " + rowsReturned);
            }
            return true;
        } catch (CannotGetJdbcConnectionException e) {
            log.debug("Error connecting to database. Error message: " + e.getMessage() + " "  + Arrays.toString(e.getStackTrace()));
            throw new DaoException("Error connecting to database. Error message: " + e.getMessage());
        }
    }

    @Override
    public int getUserIdByAuthId(String authId) {
        String sql = "SELECT user_id FROM users WHERE authId = ?";

        try {
            Integer userId = jdbcTemplate.queryForObject(sql, Integer.class, authId);
            return Objects.requireNonNullElse(userId, 0);
        } catch (CannotGetJdbcConnectionException e) {
            log.debug("Error connecting to database. Error message: " + e.getMessage() + " "  + Arrays.toString(e.getStackTrace()));
            throw new DaoException("Error connecting to database. Error message: " + e.getMessage());
        }
    }

    @Override
    public User getPublicInfoById(int userId) {
        return null;
    }


    private User mapRowSetToUser(SqlRowSet rowSet) {
        int userId = rowSet.getInt("user_id");
        String authId = rowSet.getString("auth_id");
        String firstName = rowSet.getString("first_name");
        String lastName = rowSet.getString("last_name");
        String email = rowSet.getString("email");
        boolean emailVerified = rowSet.getBoolean("email_verified");
        LocalDate dateOfBirth;

        try {
            dateOfBirth = rowSet.getDate("date_of_birth").toLocalDate();
        } catch (NullPointerException e){
            dateOfBirth = null;
        }

        long primaryPhone = rowSet.getLong("primary_phone");
        LocalDateTime createdOn = rowSet.getTimestamp("created_on").toLocalDateTime(); // will never be null;
        Character genderCode;

        try {
            genderCode = rowSet.getString("gender_code").charAt(0);
        } catch (NullPointerException e){
            genderCode = null;
        }
        boolean activated = rowSet.getBoolean("is_active");
        String picture = rowSet.getString("picture");

        return new User(userId, authId, firstName, lastName, email, emailVerified, dateOfBirth, primaryPhone, createdOn, genderCode, activated, picture, null, null);
    }
}
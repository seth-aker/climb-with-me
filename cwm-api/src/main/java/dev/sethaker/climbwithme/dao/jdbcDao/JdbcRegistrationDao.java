package dev.sethaker.climbwithme.dao.jdbcDao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.RegistrationDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Auth0User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Component
@Slf4j
public class JdbcRegistrationDao implements RegistrationDao {
    private JdbcTemplate jdbcTemplate;

    public boolean createNewUser(Auth0User user) {
        try {
            // returns true when update method returns 1 row affected
            return 1 == jdbcTemplate.update("CALL create_new_user(?,?,?,?,?,?,?,?,?,?,?,?,?);",
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
}

package dev.sethaker.climbwithme.dao.jdbcDao;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.UserAddressDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Address;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Slf4j
public class JdbcUserAddressDao implements UserAddressDao {
    private JdbcTemplate jdbcTemplate;

    public boolean insertUserAddress(int userId, Address userAddress) {
        try {
            // returns true if the insert affected 1 or more rows
            return 0 != jdbcTemplate.update("CALL insert_user_address(?,?,?,?,?,?,?,?,?,?)",
                    userId,
                    userAddress.getFullAddress(),
                    userAddress.getAddressLine1(),
                    userAddress.getAddressLine2(),
                    userAddress.getAddressLine3(),
                    userAddress.getCity(),
                    userAddress.getStateProvince(),
                    userAddress.getPostalCode(),
                    userAddress.getCountry(),
                    userAddress.getIsDefault());
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage());
        }

    }
}

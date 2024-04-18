package dev.sethaker.climbwithme.dao.jdbcDao;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import dev.sethaker.climbwithme.dao.daoInterface.UserAddressDao;
import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Address;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
@Slf4j
public class JdbcUserAddressDao implements UserAddressDao {
    private JdbcTemplate jdbcTemplate;

    public boolean insertUserAddress(int userId, Address userAddress) {
        try {
            // returns true if the insert affected 1 or more rows
            int rowCount = jdbcTemplate.queryForObject("SELECT * FROM insert_user_address(?,?,?,?,?,?,?,?,?,?)", int.class,
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
            return rowCount >= 1;
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return false;
        } catch (NullPointerException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage(), e);
        }

    }

    public Address getUserDefaultAddress(int userId) {
        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet("SELECT * FROM get_user_default_address(?)",
                    userId);
            if (rowSet.next()) {
                return mapRowSetToAddress(rowSet);
            } else {
                log.error("Default Address not found for userId: " + userId);
                List<Address> addresses = getUserAddresses(userId);
                if(addresses.isEmpty()) {
                    return null;
                }
                return addresses.get(0);
            }
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    private List<Address> getUserAddresses(int userId) {
        List<Address> addresses = new ArrayList<>();
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet("SELECT * FROM get_user_addresses(?)",
                userId);
        while(rowSet.next()) {
             addresses.add(mapRowSetToAddress(rowSet));
        }
        return addresses;
    }

    private boolean deleteUserAddress(int userId, int addressId) {
        try {
            return 1 == jdbcTemplate.queryForObject("SELECT * FROM delete_user_address(?,?)", int.class,
                    userId, addressId);
        } catch (DataAccessException e) {
            log.error(e.getMessage(), e);
            return false;
        } catch (NullPointerException e) {
            log.error(e.getMessage(), e);
            throw new DaoException(e.getMessage(), e);
        }

    }

    private Address mapRowSetToAddress(SqlRowSet rowSet) {
        Address address = new Address();
        address.setAddressId(rowSet.getInt("address_id"));
        address.setFullAddress(rowSet.getString("full_address"));
        address.setAddressLine1(rowSet.getString("address_line_1"));
        address.setAddressLine2(rowSet.getString("address_line_2"));
        address.setAddressLine3(rowSet.getString("address_line_3"));
        address.setCity(rowSet.getString("city"));
        address.setStateProvince(rowSet.getString("state_province"));
        address.setCountry(rowSet.getString("country"));
        address.setPostalCode("postal_code");
        address.setIsDefault(rowSet.getBoolean("is_default"));
        return address;
    }
}

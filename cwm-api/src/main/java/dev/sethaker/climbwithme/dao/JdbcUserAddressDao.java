package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Address;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@AllArgsConstructor
@Component
@Slf4j
public class JdbcUserAddressDao implements UserAddressDao{
    private JdbcTemplate jdbcTemplate;
    @Override
    public List<Address> getUserAddresses(String userId) {
        String sql = "SELECT address_id, address_line_1, address_line_2, city, state_province, postal_code, country, is_default " +
                "FROM user_address " +
                "WHERE user_id = ? ";
        List<Address> userAddresses = new ArrayList<>();
        try {
            SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, userId);
            while(rowSet.next()) {
                userAddresses.add(mapRowSetToAddress(rowSet));
            }
            return userAddresses;
        } catch (CannotGetJdbcConnectionException e) {
            log.debug("Error connecting to database. Error message: " + e.getMessage() + " "  + Arrays.toString(e.getStackTrace()));
            throw new DaoException("Error connecting to database. Error message: " + e.getMessage());
        }
    }

    @Override
    public Address getDefaultUserAddress(String userId) {
        return null;
    }

    @Override
    public Address addUserAddress(Address address) {
        return null;
    }

    @Override
    public boolean editUserAddress(Address address) {
        return false;
    }

    @Override
    public boolean deleteUserAddress(int AddressId) {
        return false;
    }

    private Address mapRowSetToAddress(SqlRowSet rowSet) {
        Address address = new Address();
        address.setAddressId(rowSet.getInt("address_id"));
        address.setAddressLine1(rowSet.getString("address_line_1"));
        address.setAddressLine2(rowSet.getString("address_line_2"));
        address.setCity(rowSet.getString("city"));
        address.setStateProvince(rowSet.getString("state_province"));
        address.setPostalCode(rowSet.getInt("postal_code"));
        address.setCountry(rowSet.getString("country"));
        address.setIsDefault(rowSet.getBoolean("is_default"));
        return address;
    }
}

package dev.sethaker.climbwithme.dao.jdbcDao;

import dev.sethaker.climbwithme.model.Address;
import lombok.AllArgsConstructor;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.Assert.*;

public class JdbcPrivateUserAddressDaoTest extends BaseDaoTests{
    private JdbcUserAddressDao dao;
    private JdbcTemplate jdbcTemplate;
    private static final Address TEST_ADDRESS_1 = new Address(
            null,
            "12345 E Road, City, State, Country, 12345",
            "12345 E Road",
            "null",
            null,
            "City",
            "State",
            "12345",
            "Country",
            true);
    private static final Address TEST_ADDRESS_2 = new Address(
            null,
            "567 Straight Blvd Los Angeles, CA 89876, US",
            "567 Straight Blvd",
            null,
            null,
            "Los Angeles",
            "CA",
            "89876",
            "US",
            false);

    private static final Address TEST_ADDRESS_3 = new Address(
            null,
            "123 Straight Blvd Los Angeles, CA 89876, US",
            "123 Straight Blvd",
            null,
            null,
            "Los Angeles",
            "CA",
            "89876",
            "US",
            true);

    @Before
    public void setup() {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
        this.dao = new JdbcUserAddressDao(this.jdbcTemplate);
    }
    @Test
    public void insertUserAddressTest() {
        assertTrue("Expected to return true, returned false", dao.insertUserAddress(1, TEST_ADDRESS_2));
    }
    @Test
    public void insertNewDefaultUserAddressTest() {
        assertTrue("Expected to return true, returned false", dao.insertUserAddress(1, TEST_ADDRESS_3));
    }
    @Test
    public void insertExistingAddressToUserAddressesTest() {
        assertTrue("Expected to return true, returned false", dao.insertUserAddress(1, TEST_ADDRESS_1));
    }
    @Test
    public void getUserDefaultAddressTest() {
        Address address = dao.getUserDefaultAddress(1);
        assertNotNull("Expected address to not be null", address);
        assertTrue("Expected isDefault to be True", address.getIsDefault());
    }

    @Test
    public void getUserDefaultAddressNoDefaultsReturnsAddressAnyway() {
        jdbcTemplate.update("UPDATE user_addresses SET is_default = FALSE WHERE user_id = 1;");

        Address address = dao.getUserDefaultAddress(1);
        assertNotNull("Expected object to be not null", address);
        assertFalse("Expected is_default to be false", address.getIsDefault());
    }

    @Test
    public void getUserDefaultAddressReturnsNullWhenNoAddressesExist() {
        jdbcTemplate.update("DELETE FROM user_addresses WHERE user_id = 1");

        Address address = dao.getUserDefaultAddress(1);
        assertNull("Expected address object to return null", address);
    }

    @Test
    public void deleteUserTest() {
        int numOfAddresses = dao.getUserAddresses(1).size();
        assertTrue(dao.deleteUserAddress(1,1));
        assertEquals((numOfAddresses - 1), dao.getUserAddresses(1).size());


    }



}
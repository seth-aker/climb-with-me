package dev.sethaker.climbwithme.dao.jdbcDao;

import dev.sethaker.climbwithme.model.Auth0User;
import dev.sethaker.climbwithme.model.PrivateUser;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class JdbcPrivateUserDaoTest extends BaseDaoTests {
    private JdbcUserDao dao;
    private static final Auth0User USER_1 = new Auth0User(
            LocalDateTime.of(2024,4,10,0,0), //4-10-2024
            "email@email.com",
            true,
            "Smith",
            "John",
            LocalDateTime.of(2024,4,10,0,0), //4-10-2024
            "John Smith",
            "+1-555-555-5555",
            true,
            "https://pictureUrl.com",
            LocalDateTime.of(2024,4,10,0,0), //4-10-2024
            "authId1001",
            "jsmith123");
    @Before
    public void setUp() {
        dao = new JdbcUserDao(dataSource);
    }
    @Test
    public void getUserIdTest() {
        int expectedUserId = 1;
        int result = dao.getUserId("authIdTestUser");

        assertEquals(expectedUserId, result);
    }

    @Test
    public void invalidUserIdReturnsNegative1() {
        assertEquals(-1, dao.getUserId("fakeuserId"), "Expected .getUserId to return -1 but it did not");
    }

    @Test
    public void createNewUserTest() {
        assertTrue(dao.createNewUser(USER_1));
    }

    @Test
    public void createNewUserTestWithNullValues() {
        Auth0User newUser = new Auth0User();
        newUser.setAuthId("AuthId");
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setEmailVerified(false);
        newUser.setUpdatedAt(LocalDateTime.now());
        assertTrue(dao.createNewUser(newUser));
    }

    @Test
    public void getUserTest() {
        dao.createNewUser(USER_1);
        PrivateUser result = dao.getUser(USER_1.getAuthId());
        assertEquals(dao.getUserId(USER_1.getAuthId()), result.getUserId());
    }

    @Test
    public void updateUserTest() {
        dao.createNewUser(USER_1);
        PrivateUser updatedPrivateUser = USER_1.mapToUser();
        updatedPrivateUser.setPrimaryPhone("123456789");
        assertEquals(updatedPrivateUser.getPrimaryPhone(), dao.updateUser(updatedPrivateUser).getPrimaryPhone());

    }

    @Test
    public void deactivateUserTest() {
        dao.createNewUser(USER_1);
        assertTrue(dao.deactivateUser(USER_1.getAuthId()),"Expected function deactivateUser() to return true but returned false." );

        PrivateUser privateUser1 = dao.getUser(USER_1.getAuthId());
        assertFalse(privateUser1.getIsActive(), "After deactivation expected user status 'is_active' to be false, returned true;");
    }

    @Test
    public void deactivateUserReturnsFalseWhenNoUserFound() {
        dao.createNewUser(USER_1);
        assertFalse(dao.deactivateUser("FAKEID"), "Expected function to return false when given a bad authId, see function getUser()");
    }
}
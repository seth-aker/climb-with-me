package dev.sethaker.climbwithme.dao.jdbcDao;

import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Auth0User;
import dev.sethaker.climbwithme.model.User;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class JdbcUserDaoTest extends BaseDaoTests {
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
    public void invalidUserIdThrowsDaoException() {
        assertThrows(DaoException.class, () -> dao.getUserId("fakeuserId"), "Expected .getUserId to throw execption but it did not");
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
        User result = dao.getUser(USER_1.getAuthId());
        assertEquals(dao.getUserId(USER_1.getAuthId()), result.getUserId());
    }

    @Test
    public void updateUserTest() {
        dao.createNewUser(USER_1);
        User updatedUser = USER_1.mapToUser();
        updatedUser.setPrimaryPhone("123456789");
        assertEquals(updatedUser.getPrimaryPhone(), dao.updateUser(updatedUser).getPrimaryPhone());

    }
}
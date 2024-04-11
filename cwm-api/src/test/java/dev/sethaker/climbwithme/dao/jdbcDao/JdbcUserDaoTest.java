package dev.sethaker.climbwithme.dao.jdbcDao;

import dev.sethaker.climbwithme.exception.DaoException;
import dev.sethaker.climbwithme.model.Auth0User;
import org.junit.jupiter.api.AfterEach;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

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
}
package dev.sethaker.climbwithme.dao.jdbcDao;

import dev.sethaker.climbwithme.model.ClimbingStyle;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.Assert.*;

public class JdbcClimbingStyleDaoTest extends BaseDaoTests{

    private JdbcClimbingStyleDao dao;
    private JdbcTemplate jdbcTemplate;

    private static final ClimbingStyle CLIMBING_STYLE = new ClimbingStyle('S', "5.11d", false, true, "3");
    @Before
    public void setup() {
        jdbcTemplate = new JdbcTemplate(dataSource);
        dao = new JdbcClimbingStyleDao(jdbcTemplate);
    }

    @Test
    public void insertClimbingStyleTest() {
        assertTrue(dao.insertClimbingStyle(CLIMBING_STYLE, 1));
    }
    @Test
    public void insertClimbingStyleTestNonExistentUser() {
        assertFalse(dao.insertClimbingStyle(CLIMBING_STYLE, 100));
    }
}
package dev.sethaker.climbwithme.dao.jdbcDao;

import dev.sethaker.climbwithme.model.ClimbingStyle;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class JdbcClimbingStyleDaoTest extends BaseDaoTests{

    private JdbcClimbingStyleDao dao;
    private JdbcTemplate jdbcTemplate;

    private static final ClimbingStyle CLIMBING_STYLE = new ClimbingStyle('s', "5.11d", false, true, "3");
    private static final ClimbingStyle CLIMBING_STYLE_2 = new ClimbingStyle('b', "V5", false, false, "3");

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

    @Test
    public void getUserClimbingStylesTest() {
        dao.insertClimbingStyle(CLIMBING_STYLE, 1);
        dao.insertClimbingStyle(CLIMBING_STYLE_2, 1);
        int result = dao.getUsersClimbingStyles(1).size();
        assertEquals("Expected two results returned " + result, 2, result);
    }

    @Test
    public void getUserClimbingStylesShouldReturnNullWhenEmpty() {
        assertTrue("Expected to return empty object", dao.getUsersClimbingStyles(1).isEmpty());
    }

    @Test
    public void deleteUserClimbingStylesReturnsTrue() {
        dao.insertClimbingStyle(CLIMBING_STYLE, 1);
        assertTrue(dao.deleteUserClimbingStyle(CLIMBING_STYLE, 1));
    }

    @Test
    public void updateUserClimbingStyleTest() {
        dao.insertClimbingStyle(CLIMBING_STYLE,1);
        ClimbingStyle updated = CLIMBING_STYLE;
        updated.setYearsExperience("5");
        updated.setIndoorOnly(true);

        assertTrue(dao.updateClimbingStyle(updated,1));

        List<ClimbingStyle> userStyles = dao.getUsersClimbingStyles(1);
        userStyles = userStyles.stream().filter(o -> o.getStyleCode() == 's').collect(Collectors.toList());

        assertTrue("Expected years experience to reflect updated information", userStyles.get(0).getYearsExperience().contains("5"));
        assertTrue("Expected indoor only to reflect update", userStyles.get(0).getIndoorOnly());
    }
}
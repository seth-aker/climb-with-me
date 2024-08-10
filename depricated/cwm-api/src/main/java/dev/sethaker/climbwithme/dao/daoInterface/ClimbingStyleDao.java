package dev.sethaker.climbwithme.dao.daoInterface;

import dev.sethaker.climbwithme.model.ClimbingStyle;

import java.util.List;

public interface ClimbingStyleDao {
    List<ClimbingStyle> getUsersClimbingStyles(int userId);
    boolean insertClimbingStyle(ClimbingStyle userStyle, int userId);
    boolean updateClimbingStyle(ClimbingStyle userStyle, int userId);
    boolean deleteUserClimbingStyle(ClimbingStyle userStyle, int userId);
}

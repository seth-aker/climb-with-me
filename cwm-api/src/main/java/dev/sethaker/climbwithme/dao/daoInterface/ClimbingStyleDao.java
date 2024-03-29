package dev.sethaker.climbwithme.dao.daoInterface;

import dev.sethaker.climbwithme.model.ClimbingStyle;

public interface ClimbingStyleDao {
    boolean insertClimbingStyle(ClimbingStyle userStyle, int userId);
}

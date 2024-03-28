package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.model.ClimbingStyle;

public interface ClimbingStyleDao {
    boolean insertClimbingStyle(ClimbingStyle userStyle, int userId);
}

package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.model.ClimbingStyle;

import java.util.List;

public interface ClimbingStyleDao {
    List<ClimbingStyle> getUserClimbingStyles(int userId);
}

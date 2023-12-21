package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.model.User;

public interface UserDao {
    User getUserById(int userId);
    boolean createNewUser(User user);
    boolean updateUser(User user);
    int getUserIdByAuthId(String authId);

    User getPublicInfoById(int userId);
}

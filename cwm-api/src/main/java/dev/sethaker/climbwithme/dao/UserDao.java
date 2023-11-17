package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.model.User;

public interface UserDao {
    User getUserById(String userId);
    boolean createNewUser(User user);
    boolean updateUser(User user);
}

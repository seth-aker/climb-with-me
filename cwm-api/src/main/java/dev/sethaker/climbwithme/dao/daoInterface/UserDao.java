package dev.sethaker.climbwithme.dao.daoInterface;

import dev.sethaker.climbwithme.model.User;

public interface UserDao {
    User getUserById(int userId);

    User updateUser(User user);

    int getUserIdByAuthId(String authId);

    User getPublicInfoById(int userId);
}

package dev.sethaker.climbwithme.dao.daoInterface;

import dev.sethaker.climbwithme.model.Auth0User;
import dev.sethaker.climbwithme.model.User;

public interface UserDao {

    int getUserId(String authId);

    boolean createNewUser(Auth0User user);

    boolean updateUser(User user);
}

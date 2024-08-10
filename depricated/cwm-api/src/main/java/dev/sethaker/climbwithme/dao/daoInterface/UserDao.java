package dev.sethaker.climbwithme.dao.daoInterface;

import dev.sethaker.climbwithme.model.Auth0User;
import dev.sethaker.climbwithme.model.PrivateUser;
import dev.sethaker.climbwithme.model.User;

public interface UserDao {
    /**
     Returns the Pk_userId from the authId. If the authId is not found, returns -1.
     */
    int getUserId(String authId);
    PrivateUser getUser(String authId);

    int getIdByUsername(String authId);

    User getPublicUser(String username);

    boolean createNewUser(Auth0User user);

    PrivateUser updateUser(PrivateUser privateUser);

    boolean deactivateUser(String authId);
}

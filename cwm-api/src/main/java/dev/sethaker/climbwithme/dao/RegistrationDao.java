package dev.sethaker.climbwithme.dao;

import dev.sethaker.climbwithme.model.Auth0User;

public interface RegistrationDao {
    boolean createNewUser(Auth0User user);
}

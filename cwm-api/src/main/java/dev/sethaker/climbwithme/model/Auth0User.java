package dev.sethaker.climbwithme.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Object in the body of a POST to create a new user. Documentation found here:
 *  https://auth0.com/docs/customize/actions/flows-and-triggers/post-user-registration-flow/event-object
 */
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Auth0User {
    @JsonAlias(value = "created_at")
    private String createdAt;
    private String email;
    @JsonAlias(value = "email_verified")
    private Boolean emailVerified;
    @JsonAlias(value = "family_name")
    private String familyName;
    @JsonAlias(value = "given_name")
    private String givenName;
    @JsonAlias(value = "last_password_reset")
    private String lastPasswordReset;
    @JsonAlias(value = "name")
    private String fullName;
    private String nickname;
    @JsonAlias(value = "phone_number")
    private String phoneNumber;
    @JsonAlias(value = "phone_verified")
    private Boolean phoneVerified;
    private String picture;
    @JsonAlias(value = "updated_at")
    private String updatedAt;
    @JsonAlias(value = "user_id")
    private String authId;
    private String username;
}

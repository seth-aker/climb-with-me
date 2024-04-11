package dev.sethaker.climbwithme.model;

import com.fasterxml.jackson.annotation.JsonAlias;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private LocalDateTime createdAt;

    private String email;

    @JsonAlias(value = "email_verified")
    private Boolean emailVerified;

    @JsonAlias(value = "family_name")
    private String familyName;

    @JsonAlias(value = "given_name")
    private String givenName;

    @JsonAlias(value = "last_password_reset")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private LocalDateTime lastPasswordReset;

    @JsonAlias(value = "name")
    private String fullName;

    @JsonAlias(value = "phone_number")
    private String phoneNumber;

    @JsonAlias(value = "phone_verified")
    private Boolean phoneVerified;

    private String picture;

    @JsonAlias(value = "updated_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'")
    private LocalDateTime updatedAt;

    @JsonAlias(value = "user_id")
    private String authId;

    private String username;
}

package dev.sethaker.climbwithme.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class User {
    @JsonIgnore
    private int userId; // database user id
    // from Auth0
    @JsonAlias(value = { "auth_id", "user_id" })
    private String authId;

    @JsonAlias(value = "name")
    private String fullName;
    // from Auth0
    @JsonAlias(value = { "first_name", "given_name" })
    private String firstName;
    // from Auth0
    @JsonAlias(value = { "last_name", "family_name" })
    private String lastName;
    // from Auth0
    private String email;
    // from Auth0
    @JsonAlias(value = "email_verified")
    private Boolean emailVerified;
    // from frontEnd
    @JsonAlias(value = "date_of_birth")
    private LocalDate dateOfBirth;
    // from frontEnd
    @JsonAlias(value = "phone_number")
    private String primaryPhone;

    @JsonAlias(value = "phone_verified")
    private Boolean phoneVerified;

    // from Auth0
    @JsonAlias(value = "created_at")
    private LocalDateTime createdAt;

    @JsonAlias(value = "updated_at")
    private LocalDateTime updatedAt;
    // from FrontEnd
    @JsonAlias(value = "gender_code")
    private String genderCode;
    // from frontEnd
    @JsonAlias(value = "is_active")
    private Boolean isActive;
    // from Auth0
    private String picture;

    @JsonAlias(value = "weight_range")
    private String weightRange;

    @JsonAlias(value = "last_password_reset")
    private LocalDateTime lastPasswordReset;

    private String username;

    @JsonAlias(value = "user_address")
    private List<Address> userAddresses;

    @JsonAlias(value = "climbing_styles")
    private List<ClimbingStyle> climbingStyles;

}

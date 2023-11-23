package dev.sethaker.climbwithme.model;

import com.fasterxml.jackson.annotation.JsonAlias;
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

    //from Auth0
    @JsonAlias(value = "user_id")
    private String userId;
    //from frontEnd
    private String username;
    //from Auth0
    @JsonAlias(value = "first_name")
    private String firstName;
    //from frontEnd
    @JsonAlias(value = "middle_name")
    private String middleName;
    //from Auth0
    @JsonAlias(value = "last_name")
    private String lastName;
    //from Auth0
    private String email;
    //from Auth0
    @JsonAlias(value = "email_verified")
    private Boolean emailVerified;
    //from frontEnd
    @JsonAlias(value = "date_of_birth")
    private LocalDate dateOfBirth;
    //from frontEnd
    @JsonAlias(value = "primary_phone")
    private Integer primaryPhone;
    //from Auth0
    @JsonAlias(value = "created_on")
    private LocalDateTime createdOn;
    //from FrontEnd
    @JsonAlias(value = "gender_code")
    private Character genderCode;
    //from frontEnd
    @JsonAlias(value = "is_active")
    private Boolean isActive;
    //from Auth0
    private String picture;

    @JsonAlias(value = "user_address")
    private List<Address> userAddresses;
}

package dev.sethaker.climbwithme.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @JsonAlias(value = "name")
    private String fullName;
    // from Auth0
    @JsonAlias(value = { "first_name", "given_name" })
    private String firstName;
    // from Auth0
    @JsonAlias(value = { "last_name", "family_name" })
    private String lastName;

    private String username;

    private String picture;

    @JsonAlias(value = "gender_code")
    private String genderCode;

    @JsonAlias(value = "climbing_styles")
    private List<ClimbingStyle> climbingStyles;

}

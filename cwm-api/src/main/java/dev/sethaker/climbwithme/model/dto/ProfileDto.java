package dev.sethaker.climbwithme.model.dto;

import dev.sethaker.climbwithme.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfileDto {
    private String state;
    private User user;
}

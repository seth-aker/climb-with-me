package dev.sethaker.climbwithme.controller;

import dev.sethaker.climbwithme.dao.ClimbingStyleDao;
import dev.sethaker.climbwithme.dao.UserAddressDao;
import dev.sethaker.climbwithme.dao.UserDao;
import dev.sethaker.climbwithme.model.User;
import dev.sethaker.climbwithme.model.dto.ProfileDto;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    private UserDao userDao;
    private UserAddressDao userAddressDao;
    private ClimbingStyleDao climbingStyleDao;

    @GetMapping("/{publicUserId}")
    public ProfileDto getUserProfile(@RequestParam String publicUserId, Principal principal) {
        String authId = principal.getName().substring(principal.getName().indexOf("|"));
        ProfileDto profileDTO = new ProfileDto();
        int userId = userDao.getUserIdByAuthId(authId);
        if(!publicUserId.equals(authId)) {
            profileDTO.setState("public");
            profileDTO.setUser(userDao.getPublicInfoById(userId));
        } else {
            profileDTO.setState("private");
            User user = userDao.getUserById(userId);
            user.setUserAddresses(userAddressDao.getUserAddresses(userId));
            user.setClimbingStyles(climbingStyleDao.getUserClimbingStyles(userId));
            profileDTO.setUser(user);
        }
        return profileDTO;
    }
}

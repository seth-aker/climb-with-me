package dev.sethaker.climbwithme.controller;

import dev.sethaker.climbwithme.dao.UserAddressDao;
import dev.sethaker.climbwithme.dao.UserDao;
import dev.sethaker.climbwithme.model.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
    private UserDao userDao;
    private UserAddressDao userAddressDao;

    @GetMapping("/{publicUserId}")
    public User getUserProfile(@RequestParam String publicUserId, Principal principal) {
        String authId = principal.getName().substring(principal.getName().indexOf("|"));
        User user;
        int userId = userDao.getUserIdByAuthId(authId);
        if (!publicUserId.equals(authId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You do not have permission to access this resource");
        } else {
            user = userDao.getUserById(userId);
            user.setUserAddresses(userAddressDao.getUserAddresses(userId));

        }
        return user;
    }

    @PostMapping("/{publicUserId}")
    public User updateUserProfile(@RequestParam String publicUserId, Principal principal,
            @RequestBody User updatedUser) {
        String authId = principal.getName().substring(principal.getName().indexOf("|"));
        if (!publicUserId.equals(authId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You do not have permission to access this resource");
        } else {
            updatedUser.setUserId(userDao.getUserIdByAuthId(authId));
            return userDao.updateUser(updatedUser);
        }
    }
}

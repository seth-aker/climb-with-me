package dev.sethaker.climbwithme.controller;

// import dev.sethaker.climbwithme.dao.daoInterface.UserAddressDao;
import dev.sethaker.climbwithme.dao.daoInterface.UserDao;
import dev.sethaker.climbwithme.model.PrivateUser;
import dev.sethaker.climbwithme.model.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
  private UserDao userDao;

    // private UserAddressDao userAddressDao;

     @GetMapping("/{username}")
     public User getUserProfile(@RequestParam String username, Principal principal) {
         String authId = principal.getName();
         PrivateUser user = userDao.getUser(authId);
         if(user.getUsername().equals(username)) {
             return user;
         } else {
              return userDao.getPublicUser(username);
         }
     }

//     @PostMapping("/{publicUserId}")
//     public User updateUserProfile(@RequestParam String publicUserId, Principal principal,
//             @RequestBody User updatedUser) {
//         String authId = principal.getName().substring(principal.getName().indexOf("|"));
//         if (!publicUserId.equals(authId)) {
//             throw new ResponseStatusException(HttpStatus.FORBIDDEN,
//                     "You do not have permission to access this resource");
//         } else {
//             updatedUser.setUserId(userDao.getUserIdByAuthId(authId));
//             return userDao.updateUser(updatedUser);
//         }
//     }
 }

package dev.sethaker.climbwithme.controller;

import dev.sethaker.climbwithme.dao.UserAddressDao;
import dev.sethaker.climbwithme.dao.UserDao;
import dev.sethaker.climbwithme.model.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



@RestController
@AllArgsConstructor
@RequestMapping("/api/register")
public class RegistrationController {

    private final UserDao userDao;
    private final UserAddressDao userAddressDao;

    @PostMapping("/new_user")
    public HttpStatus registerNewUser(@RequestBody User user) {
        if(userDao.createNewUser(user)){
            return HttpStatus.CREATED;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

}

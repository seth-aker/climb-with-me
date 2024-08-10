package dev.sethaker.climbwithme.controller;

import dev.sethaker.climbwithme.dao.daoInterface.UserDao;
import dev.sethaker.climbwithme.model.Auth0User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/register")
@CrossOrigin
public class RegistrationController {
    private final UserDao userDao;

    public RegistrationController(UserDao userDao) {
        this.userDao = userDao;
    }

    /*
     * Endpoint is called by auth0's post user registration flow, see linked
     * documentation for more details.
     * https://auth0.com/docs/customize/actions/flows-and-triggers/post-user-
     * registration-flow
     * 
     * The flow that calls this endpoint is in the Actions tab on Auth0's app
     * management dashboard
     * https://manage.auth0.com/dashboard/us/dev-sethaker/actions/flows
     */
    @PostMapping("/new_user")
    public ResponseEntity<?> registerNewUser(@RequestBody Auth0User user, Principal principal) {
        user.setAuthId(principal.getName());
        if (userDao.createNewUser(user)) {
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred, please try again");
        }
    }
}

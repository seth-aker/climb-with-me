package dev.sethaker.climbwithme.controller;

import dev.sethaker.climbwithme.dao.daoInterface.UserDao;
import dev.sethaker.climbwithme.model.Auth0User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;

@RestController
@RequestMapping("/api/register")
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
    @PermitAll
    public ResponseEntity registerNewUser(@RequestBody Auth0User user) {

        if (userDao.createNewUser(user)) {
            return new ResponseEntity(HttpStatus.CREATED);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}

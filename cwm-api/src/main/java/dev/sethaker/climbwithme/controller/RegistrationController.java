package dev.sethaker.climbwithme.controller;

import dev.sethaker.climbwithme.dao.daoInterface.UserDao;
import dev.sethaker.climbwithme.model.Auth0User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {
    private final UserDao registrationDao;

    public RegistrationController(UserDao registrationDao) {
        this.registrationDao = registrationDao;
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
    public HttpStatus registerNewUser(@RequestBody Auth0User user) {
        if (registrationDao.createNewUser(user)) {
            return HttpStatus.CREATED;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }
}

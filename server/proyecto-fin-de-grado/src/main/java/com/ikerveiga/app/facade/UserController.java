package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.DTO.UserDTO;
import com.ikerveiga.app.service.UserService;

@RestController
@CrossOrigin("http://localhost:5173")
public class UserController {
   
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /** Method for creating a new user
     * @param userDTO New user to create
     * 
     * @exception RuntimeException 
     */

    @PostMapping("/users") 
    public ResponseEntity<Void> signup(@RequestBody UserDTO userDTO) {
        try{
            userService.signup(userDTO.getName(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getIsCoach());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("User already exists")) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            } else {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    /**
     * Method for logging in with a user account
     * @param userDTO User to logging in
     * 
     * @exception RuntimeException
     */

    @PostMapping("/login")
    public ResponseEntity<Long> login(@RequestBody UserDTO userDTO) {
        try{
            long token = userService.login(userDTO.getEmail(), userDTO.getPassword());
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            if(e.getMessage().equals("User with that email does not exist")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else if(e.getMessage().equals("Incorrect password")) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}

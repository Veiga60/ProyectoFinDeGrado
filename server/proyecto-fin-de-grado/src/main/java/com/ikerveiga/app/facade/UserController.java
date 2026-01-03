package com.ikerveiga.app.facade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ikerveiga.app.dto.UserDTO;
import com.ikerveiga.app.service.UserService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<Object> getAuthenticatedUser() {
        Object authenticatedUser = userService.getAuthenticatedUser();
        return ResponseEntity.ok(authenticatedUser);
    }

    /**
     * Method for creating a new user
     * 
     * @param userDTO New user to create
     * 
     * @exception RuntimeException
     */

    @PostMapping("/users")
    public ResponseEntity<Void> signup(@RequestBody UserDTO userDTO) {
        try {
            userService.signup(userDTO.getUserName(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getIsCoach());
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
     * 
     * @param userDTO User to logging in
     * 
     * @exception RuntimeException
     */

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        try {
            String token = userService.login(userDTO.getEmail(), userDTO.getPassword(), response);
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("No existe un usuario con ese email")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else if (e.getMessage().equals("Contraseña incorrecta")) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PostMapping("/me/role")
    public ResponseEntity<Void> setIsCoachTrue(@RequestParam boolean isCoach, @RequestParam String email) {
        try {
            userService.setIsCoach(isCoach, email);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().equals("Usuario no registrado")) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }
}

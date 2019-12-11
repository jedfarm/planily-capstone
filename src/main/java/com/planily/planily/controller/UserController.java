package com.planily.planily.controller;

import com.planily.planily.exception.UserNotFoundException;
import com.planily.planily.model.User;
import com.planily.planily.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    //Get all users
    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //Create new user
    @PostMapping("/user")
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    //Get single user
    @GetMapping("/user/{id}")
    public User getMealById(@PathVariable(value = "id") long userId) throws UserNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

}

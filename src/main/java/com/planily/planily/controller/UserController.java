package com.planily.planily.controller;

import com.planily.planily.model.User;
import com.planily.planily.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
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
    @GetMapping("/user")
    public User getUserById(@PathVariable(value = "id") Long userId) {
        return userRepository.findById(userId);
    }

}

package com.planily.planily.model;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private int id;

    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private String role;

    @NotBlank
    private String familyCode;

    @OneToMany
    @JoinColumn(name = "meal_id")
    private List<Meal> meals = new ArrayList<>();

    public User() { }

    public User(String email, String username, String password, String role, String familyCode) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.familyCode = familyCode;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFamilyCode() {
        return familyCode;
    }

    public void setFamilyCode(String familyCode) {
        this.familyCode = familyCode;
    }
}

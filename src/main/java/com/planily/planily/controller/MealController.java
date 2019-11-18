package com.planily.planily.controller;

import com.planily.planily.exception.MealNotFoundException;
import com.planily.planily.model.Meal;
import com.planily.planily.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class MealController {

    @Autowired
    MealRepository mealRepository;

    //Get all meals
    @GetMapping("/meals")
    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    //Create a new meal
    @PostMapping("/meals")
    public Meal createMeal(@Valid @RequestBody Meal meal) {
        return mealRepository.save(meal);
    }

    //Get one meal
    @GetMapping("/meals/{id}")
    public Meal getMealById(@PathVariable(value = "id") Long mealId) throws MealNotFoundException {
        return mealRepository.findById(mealId)
                .orElseThrow(() -> new MealNotFoundException(mealId));
    }

    //Update a meal
    @PutMapping("/meals/{id}")
    public Meal updateMeal(@PathVariable(value = "id") Long mealId, @Valid @RequestBody Meal mealDetails) throws MealNotFoundException {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new MealNotFoundException(mealId));
        meal.setMealDate(mealDetails.getMealDate());

        Meal updatedMeal = mealRepository.save(meal);

        return updatedMeal;

    }

    //Delete a meal
    @DeleteMapping("/meals/{id}")
    public ResponseEntity<?> deleteMeal(@PathVariable(value = "id") Long mealId) throws MealNotFoundException {
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new MealNotFoundException(mealId));
        mealRepository.delete(meal);

        return ResponseEntity.ok().build();
    }
}

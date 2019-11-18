package com.planily.planily.exception;

public class MealNotFoundException extends Exception {

    private Long meal_id;
    public MealNotFoundException(Long meal_id) {
        super(String.format("Meal is not found with id : '%s'", meal_id));
    }
}

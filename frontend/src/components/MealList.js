import React from 'react';
import {useFetch} from "../helpers/hooks";
import { Link } from 'react-router-dom';

const MealList = () => {

    const [meals] = useFetch('http://localhost:8080/api/meals')
    console.log(meals)


        return (
            <div className="meal-list">
                <h1>All Meals</h1>
                <button><Link to='/add'>Add Meal</Link></button>
                <table>
                    <tbody>
                    {meals.map((meal) =>
                        <tr key={meal.id}>
                            <td>{meal.name}</td>
                            <td>{meal.mealDate}</td>
                            {/*<td>{meal.owner}</td>*/}
                            <td>{meal.rating}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }

export default MealList;
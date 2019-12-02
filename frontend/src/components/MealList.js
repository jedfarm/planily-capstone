import React, {Component} from 'react';

class MealList extends Component {

    render() {
        return (
            <div className="meal-list">
                <h1>Meal List</h1>
                <ul>
                    {this.props.meals.map((meal) => <li key={meal.id}>{meal.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default MealList;
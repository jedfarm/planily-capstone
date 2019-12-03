import React, {Component} from 'react';

class MealList extends Component {

    render() {


        return (
            <div className="meal-list">
                <h1>All Meals</h1>
                <table>
                    <tbody>
                    {this.props.meals.map((meal) =>
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
}

export default MealList;
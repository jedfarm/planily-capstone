import React, {Component} from 'react';
import './App.css';

class App extends Component {

    state = {
        isLoading: true,
        meals: [],
        users: [],
    };

    componentDidMount() {
        Promise.all([fetch('http://localhost:8080/api/meals'), fetch('http://localhost:8080/api/user')])
            .then(([res1, res2]) => {
                console.log(res1, res2);
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([res1, res2]) => {
                this.setState({
                    meals: res1,
                    users: res2,
                    isLoading: false,
                })
            })
    }

    // componentDidMount() {
    //     Promise.all([fetch('/api/meals'), fetch('/api/user')])
    //
    //         .then(([res1, res2]) => {
    //             return Promise.all([res1.json(), res2.json()])
    //         })
    //         .then(([res1, res2]) => {
    //             this.setState({
    //                     meals: res1,
    //                     users: res2,
    //
    //         });
    // }

    // componentDidMount() {
    //     this.getMeals();
    // }
    //
    // getMeals() {
    //     fetch('/api/meals')
    //         .then(response => response.json())
    //         .then(data => this.setState({meals: data, isLoading: false}));
    // }

    render() {

        const {meals, isLoading} = this.state;

        if(isLoading) {
            return <p>Loading...</p>
        }
        return (
            <header>
                <h1>Planily</h1>
                <p>Family Group</p>

                <nav>
                    <button>Home</button>
                    <button>Calendar</button>
                </nav>
                <h2>Meals</h2>
                {meals.map(meal =>
                <div key={meal.id}>
                    {meal.name}
                </div>
                )}
            </header>
    );
    }
}

export default App;
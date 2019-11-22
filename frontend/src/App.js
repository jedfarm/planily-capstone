import React, {Component} from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meals : []
        }
    }

    componentDidMount() {
    }

    getMeals() {
        fetch('http://localhost:8080/api/meals')
            .then(res = > res.json())
            .then((data) => {
            this.setState( {meals: data } )
        })
    }


    render() {
        return (
            <header>
                <h1>Planily</h1>
                <p>Family Group</p>

                <nav>
                    <button>Home</button>
                    <button>Calendar</button>
                </nav>
                <ul>
                    <li>{this.state.meals}</li>
                </ul>
            </header>
    );
    }
}

export default App;
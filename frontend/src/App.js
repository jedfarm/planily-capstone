import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Calendar from './components/Calendar';

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

    render() {

        const {meals, isLoading} = this.state;

        if(isLoading) {
            return <p>Loading...</p>
        }
        return (
            <div>
                <h1>Planily</h1>
                <p>Family Group</p>

                <nav>
                    <button>Home</button>
                    <button>Calendar</button>
                </nav>
               <div className="Calendar">
                   <Calendar />
               </div>
            </div>
    );
    }
}

export default App;
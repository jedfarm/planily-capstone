import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import './App.css';
import Login from "./components/Login";
import Calendar from './components/Calendar/Calendar';
import Register from './components/Register'
import MealsForm from './components/MealsForm'
import MealList from './components/MealList'

const history = createBrowserHistory();

const Routes = () => {
    return (
        <Router history={history}>
            <div className="header">
                <h1>Planily</h1>
                 <p>Family Code</p>

                 <nav>
                     <button>Home</button>
                     <button><Link to="/calendar">Calendar</Link></button>
                     <button><Link to="/login">Login</Link></button>
                 </nav>
            </div>
            <Switch>
                <Route path="/login" >
                    <Login />
                </Route>
                <Route path="/register" >
                    <Register />
                </Route>
                <Route path="/calendar" >
                    <Calendar />
                </Route>
                <Route path="/add" >
                    <MealsForm/>
                </Route>
                <Route path="/list" >
                    <MealList />
                </Route>
                {/*<Route path="/logout" component={LogoutHandler} />*/}
                {/*<Route path="*" component={ProtectedHandler} />*/}
            </Switch>
        </Router>
    );
};

const App = () => (
    <div className="App">
        <Routes />
    </div>
);

//Preserving all of this old code in case the tutorial I am following doesn't work :)


// class App extends Component {
//
//     state = {
//         isLoading: true,
//         meals: [],
//         users: [],
//     };
//
//     componentDidMount() {
//         this.getMeals();
//     }
//
//     getMeals() {
//         Promise.all([fetch('http://localhost:8080/api/meals'), fetch('http://localhost:8080/api/user')])
//             .then(([res1, res2]) => {
//                 console.log(res1, res2);
//                 return Promise.all([res1.json(), res2.json()])
//             })
//             .then(([res1, res2]) => {
//                 this.setState({
//                     meals: res1,
//                     users: res2,
//                     isLoading: false,
//                 })
//             })
//     }
//
//     // componentDidMount() {
//     //     Promise.all([fetch('http://localhost:8080/api/meals'), fetch('http://localhost:8080/api/user')])
//     //         .then(([res1, res2]) => {
//     //             console.log(res1, res2);
//     //             return Promise.all([res1.json(), res2.json()])
//     //         })
//     //         .then(([res1, res2]) => {
//     //             this.setState({
//     //                 meals: res1,
//     //                 users: res2,
//     //                 isLoading: false,
//     //             })
//     //         })
//     // }
//
//     render() {
//
//         // const {meals, isLoading} = this.state;
//         //
//         // if(isLoading) {
//         //     return <p>Loading...</p>
//         // }
//         return (
//             <div>
//                 <h1>Planily</h1>
//                 <p>{this.state.users.familyCode}</p>
//
//                 <nav>
//                     <button>Home</button>
//                     <button>Calendar</button>
//                 </nav>
//                <div className="testing">
//                    <Register />
//                    <Login />
//                    <MealsForm />
//                    <MealList meals={this.state.meals} />
//                </div>
//             </div>
//     );
//     }
// }

export default App;
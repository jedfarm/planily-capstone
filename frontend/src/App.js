import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import './App.css';
import Login from "./components/Login";
import Calendar from './components/Calendar/Calendar';
import Register from './components/Register'
import MealsForm from './components/MealsForm'
import MealList from './components/MealList'
import {getSessionCookie} from "./helpers/cookies";
import Cookie from 'js-cookie';


const history = createBrowserHistory();


const Routes = () => {

    const isUserLoggedIn = () => {
        let isLoggedIn = false;
        const userCookie = getSessionCookie();
        userCookie[0] !== undefined ? isLoggedIn = true : console.log('not logged in');

        /*console.log(userCookie);

        userCookie ? console.log('got cookie') : console.log('cookie error');
        userCookie ? isLoggedIn = true : isLoggedIn = false;*/
        return isLoggedIn;
    }

    const AuthenticatedRoute = ({ children, ...rest}) => (

        <Route
            {...rest}
            render={ props =>
                Cookie.get('token') ? (
                    children
                ) : ( <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                /> )
            }
        />
    )


    return (
        <div>
        <Router history={history}>
                <Route path="/login" >
                    <Login />
                </Route>
                <Route path="/register" >
                    <Register />
                </Route>
            <Switch>
                <AuthenticatedRoute path="/calendar" >
                    <Calendar />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/add" >
                    <MealsForm/>
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/list" >
                    <MealList />
                </AuthenticatedRoute>
            </Switch>
        </Router>
    </div>
    );
};

const App = () => (
    <div className="App">
        <div className="header">
            <h1>Planily</h1>
            <p>Family Code</p>

            <nav>
                <button><a href="/list">Home</a></button>
                <button><a href="/calendar">Calendar</a></button>
                <button><a href="/login">Login</a></button>
            </nav>
        </div>
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
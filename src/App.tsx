import React, {useState} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {Start} from "./components/form/start/Start";
import {Login} from "./components/login/Login";
import {BootStrapLogin} from "./components/login/BootStrapLogin";
import {Route, BrowserRouter as Router, Link, Redirect} from 'react-router-dom';

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [hashedUser, setHashedUser] = useState("");
    return (
        <Router>
            <div className="App text-center">
                {!isLoggedIn ?

                    (<Redirect to={{pathname: '/login'}} />)
                    :
                    (
                        <Navbar />
                    )
                }
                <Route path="/start" exact component={Start} />
                <Route path="/login" exact render={props =>
                    (<BootStrapLogin isLoggedIn={isLoggedIn} handleLoggin={setLoggedIn} handleHashedUser={setHashedUser}/>)
                }/>
            </div>
        </Router>
    );
}

export default App;

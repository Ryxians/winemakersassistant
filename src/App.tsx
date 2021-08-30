import React, {useState} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {NewKit} from "./components/form/winecreation/NewKit";
import {BootStrapLogin} from "./components/form/login/BootStrapLogin";
import {Route, BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import {Start} from "./components/form/winecreation/Start";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [hashedUser, setHashedUser] = useState("");
    const [route, changeRoute] = useState("/");

    return (
        <Router>
            <div className="App text-center">
                {!isLoggedIn ?

                    (<Redirect to={{pathname: '/login'}} />)
                    :
                    (
                        <>
                            <Navbar  changeRoute={changeRoute}/>
                            <Redirect to={{pathname: route}} />
                        </>

                    )
                }
                <Route path="/start" exact component={Start} />
                <Route path="/newkit" exact component={NewKit} />
                <Route path="/login" exact render={props =>
                    (<BootStrapLogin isLoggedIn={isLoggedIn} handleLoggin={setLoggedIn} handleHashedUser={setHashedUser}/>)
                }/>
            </div>
        </Router>
    );
}

export default App;

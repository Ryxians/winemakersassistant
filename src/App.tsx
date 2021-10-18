import React, {useEffect, useState} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {NewKit} from "./components/form/winecreation/NewKit";
import {BootStrapLogin} from "./components/form/login/BootStrapLogin";
import {Route, BrowserRouter as Router, Link, Redirect, useLocation} from 'react-router-dom';
import {Start} from "./components/form/winecreation/Start";
import {GeneralForm} from "./components/form/GeneralForm";
import {NewBatchC} from "./components/form/form-inputs/NewBatchC";
import {Continue} from "./components/form/winecreation/Continue";
import {FermentationC} from "./components/form/form-inputs/FermentationC";
import { Batch } from "@server/database/entities/Batch"

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [hashedUser, setHashedUser] = useState("");
    const [route, changeRoute] = useState("/");
    const [currentBatch, setBatch] = useState<Batch>()

    const savedHash = localStorage.getItem("hashedUser");
    const saveProgress = true;

    useEffect(() => {
        if (savedHash && saveProgress) {
            // console.log("Saved Hash: ", savedHash);
            setHashedUser(savedHash);
            setLoggedIn(true);
            // changeRoute(window.location.pathname);
        }


    })

    const logout = () => {
        setLoggedIn(false);
        setHashedUser("");
        localStorage.clear();
    }

    const handleHashedUser = (hashedUsr: string) => {
        setHashedUser(hashedUsr);
        localStorage.setItem("hashedUser", hashedUsr);
        setLoggedIn(true);
    }

    return (
        <Router>
            <div className="App text-center">
                {!isLoggedIn ?

                    (<Redirect to={{pathname: '/login'}}/>)
                    :
                    (
                        <>
                            <Navbar changeRoute={changeRoute} logout={logout}/>
                        </>

                    )
                }
                <Route path="/continue" exact render={ () =>
                    <Continue setBatch={setBatch}/>
                }/>
                <Route path="/new" exact component={NewBatchC}/>
                <Route path="/login" exact render={() =>
                    (<BootStrapLogin isLoggedIn={isLoggedIn}
                                     handleHashedUser={handleHashedUser}/>)
                }/>
                <Route path="/fermentation" exact render={
                    props => (<FermentationC batch={currentBatch}/>)
                } />
                <Route path="/" exact component={GeneralForm}/>
            </div>
        </Router>
    );
}

export default App;

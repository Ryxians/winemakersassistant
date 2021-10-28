import React, {useEffect, useState} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {BootStrapLogin} from "./components/login/BootStrapLogin";
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {NewBatchC} from "./components/sections/stage-components/NewBatchC";
import {Continue} from "./components/sections/managewine/continue/Continue";
import {FermentationC} from "./components/sections/stage-components/FermentationC";
import { Batch } from "@server/database/entities/Batch"
import {RackingC} from "./components/sections/stage-components/RackingC";
import {FilteringC} from "./components/sections/stage-components/FilteringC";
import {WineLog} from "./components/sections/winelog/WineLog";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [hashedUser, setHashedUser] = useState("");
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
                            <Navbar logout={logout}/>
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

                <Route path="/winelog" exact render={
                    () => (<WineLog wine={currentBatch!.wine} />)
                } />

                <Route path="/fermentation" exact render={
                    () => (<FermentationC batch={currentBatch}/>)
                } />
                <Route path="/racking" exact render={
                    () => (<RackingC batch={currentBatch}/>)
                } />
                <Route path="/filtering" exact render={
                    () => (<FilteringC batch={currentBatch}/>)
                } />

                <Route path="/" exact render={() => (<h1>Use the navbar</h1>)}/>
            </div>
        </Router>
    );
}

export default App;

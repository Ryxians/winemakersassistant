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
import {Blended_Batch} from "@entities/Blended_Batch"
import {UsersList} from "./components/sections/manageusers/UsersList";
import Axios from "axios";

function App() {
    Axios.defaults.withCredentials = true;

    const [isLoggedIn, setLoggedIn] = useState(false);
    // const [hashedUser, setHashedUser] = useState("");
    const [currentBatch, setBatch] = useState<Batch | Blended_Batch>()

    const savedHash = localStorage.getItem("hashedUser");
    const saveProgress = true;

    useEffect(() => {
        Axios.get('/users/login').then(res => {
            res.status === 200 ? setLoggedIn(true) : setLoggedIn(false);
        });
    }, [])

    const logout = () => {
        setLoggedIn(false);
        // setHashedUser("");
        localStorage.clear();
    }

    const handleLogin = () => {
        // setHashedUser(hashedUsr);
        // localStorage.setItem("hashedUser", hashedUsr);
        setLoggedIn(true);
    }

    return (
        <Router>
            <div className="App text-center">
                {isLoggedIn ?


                    (
                        <>
                            <Navbar logout={logout}/>
                        </>

                    ) :
                    (
                        <BootStrapLogin isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
                    )
                }
                <Route path="/continue" exact render={ () =>
                    <Continue setBatch={setBatch}/>
                }/>
                <Route path="/new" exact component={NewBatchC}/>
                <Route path="/login" exact render={() =>
                    (<BootStrapLogin isLoggedIn={isLoggedIn}
                                     handleLogin={handleLogin}/>)
                }/>
                <Route path={"/users"} exact component={UsersList} />

                <Route path="/winelog" exact render={
                    () => (currentBatch ? <WineLog batch={currentBatch} /> : <Redirect to={'/'} />)
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

                <Route path="/" exact render={() => (isLoggedIn && <h1>Use the navbar</h1>)}/>
            </div>
        </Router>
    );
}

export default App;

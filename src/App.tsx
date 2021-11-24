import React, {useEffect, useState} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {BootStrapLogin} from "./components/login/BootStrapLogin";
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {NewBatchC} from "./components/sections/manage/stage-components/NewBatchC";
import {ManageWine} from "./components/sections/manage/ManageWine";
import {FermentationC} from "./components/sections/manage/stage-components/FermentationC";
import { Batch } from "@server/database/entities/Batch"
import {RackingC} from "./components/sections/manage/stage-components/RackingC";
import {FilteringC} from "./components/sections/manage/stage-components/FilteringC";
import {WineLog} from "./components/sections/winelog/WineLog";
import {Blended_Batch} from "@entities/Blended_Batch"
import {UsersList} from "./components/sections/manageusers/UsersList";
import Axios from "axios";
import {Toast, ToastContainer, ToastHeader} from "react-bootstrap";
import wineglass from "./components/login/glass-with-wine.svg";
import {ToastPosition} from "react-bootstrap/ToastContainer";
import {BackendToast} from "./components/BackendToast";

function App() {
    Axios.defaults.withCredentials = true;
    let position:ToastPosition = 'bottom-end'
    const [toasts, setToasts] = useState<JSX.Element[]>([]);

    Axios.interceptors.response.use(res => {
        if (res.status !== 200) {
            let newToast = <BackendToast message={res.statusText} />
            if (toasts.length > 3) {
                setToasts([newToast]);
            } else {
                setToasts([...toasts, newToast]);
            }
        }
        return res;
    }, res => {
            let newToast = <BackendToast message={"Can't reach backend"} />
            setToasts([...toasts, newToast]);
            return res;
    })


    const [isLoggedIn, setLoggedIn] = useState(false);
    // const [hashedUser, setHashedUser] = useState("");
    const [currentBatch, setBatch] = useState<Batch | Blended_Batch>()

    const savedHash = localStorage.getItem("hashedUser");
    const saveProgress = true;

    useEffect(() => {
        Axios.get('/users/login').then(res => {
            res.status === 200 ? setLoggedIn(true) : setLoggedIn(false);
            console.log("Login Status: ", res.status);
        });
    }, [])

    const logout = () => {
        Axios.post('/users/logout').then(res => {
            console.log("Logout Status: ", res.status);
            setLoggedIn(false);
            localStorage.clear();
        });
        // setHashedUser("");
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
                <Route path="/manage" exact render={ () =>
                    <ManageWine setBatch={setBatch}/>
                }/>
                <Route path="/login" exact render={() =>
                    (<BootStrapLogin isLoggedIn={isLoggedIn}
                                     handleLogin={handleLogin}/>)
                }/>
                <Route path={"/users"} exact component={UsersList} />

                <Route path="/winelog" exact render={
                    () => (currentBatch ? <WineLog batch={currentBatch} /> : <Redirect to={'/'} />)
                } />

                <Route path="/" exact render={() => (isLoggedIn && <h1>Use the navbar</h1>)}/>

                <ToastContainer className="p-3" position={position}>
                    {toasts}
                </ToastContainer>
            </div>
        </Router>
    );
}

export default App;

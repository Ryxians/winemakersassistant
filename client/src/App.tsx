import React, {useEffect, useState} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {BootStrapLogin} from "./components/login/BootStrapLogin";
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {ManageWine} from "./components/sections/manage/ManageWine";
import { Batch } from "@server/database/entities/Batch"
import {WineLog} from "./components/sections/winelog/WineLog";
import {Blended_Batch} from "@entities/Blended_Batch"
import {UsersList} from "./components/sections/manageusers/UsersList";
import Axios from "axios";
import {ToastContainer} from "react-bootstrap";
import {ToastPosition} from "react-bootstrap/ToastContainer";
import {BackendToast} from "./components/BackendToast";
import {User} from "@entities/User"
import {CalculatorPage} from "./components/calculator/page/CalculatorPage";


function App() {
    // This tells Axios to use the credentials saved in the cookie from Express-Session
    Axios.defaults.withCredentials = true;

    // TOASTS - Warnings/Updates displayed in the bottom right corner.
    // Where the toasts should be displayed
    let position:ToastPosition = 'bottom-end'

    // An array of valid toasts.
    const [toasts, setToasts] = useState<JSX.Element[]>([]);

    // Axios middleware to create Toasts
    Axios.interceptors.response.use(res => {
        if (res.status !== 200) {
            let newToast = <BackendToast key={toasts.length} message={res.statusText} />
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

    // The user object used for role management and record keeping
    const [user, setUser] = useState<User | undefined>(undefined);

    // Rendering a result based on whether the user is logged in
    const [render, setRender] = useState<JSX.Element>()
    const [isLoggedIn, setLoggedIn] = useState(false);

    // Track the last modified batch
    const [currentBatch, setBatch] = useState<Batch | Blended_Batch>()

    // On first page load
    useEffect(() => {

        // Check if the user is already logged in
        Axios.get('/users/login').then(res => {
            // If the server says the user is logged in
            if (res.status === 200) {
                // Set logged in to true
                setLoggedIn(true);

                // set user to the recieved user
                // And render the Navbar
                let resUser:User = res.data;
                if (resUser) {
                    setUser(resUser);
                    setRender(
                        <>
                            <Navbar logout={logout} user={resUser}/>
                        </>
                    );
                }
            } else {
                // If the server says the user is not logged in
                // Set logged in to false and redirect to login page
                setLoggedIn(false);
                setRender(<Redirect to={'/login'} />);
            }
        });
    }, [])

    // Code to run for logout
    const logout = () => {
        // Tell the server the user is logging out.
        Axios.post('/users/logout').then(() => {
            // Set logged in to false
            setLoggedIn(false);

            // Redirect user to login page
            setRender(<Redirect to={'/login'} />);

            // Clear session
            sessionStorage.clear();
        });
    }

    // When the user is logged in
    const handleLogin = (usr:User) => {
        // Set the user state to the user
        setUser(usr);

        // Set logged in true
        setLoggedIn(true);

        // Render Navbar
        setRender(
            <>
                <Navbar logout={logout} user={usr}/>
            </>
        );

    }



    return (
        <Router>
            <div className="App text-center">
                {/*Render will either be the Navbar or a redirect to the Login screen*/}
                {render}

                {/*Possible Paths*/}
                <Route path="/manage" exact render={ () =>
                    <ManageWine setBatch={setBatch} user={user}/>
                }/>

                <Route path="/login" exact render={() =>
                    (<BootStrapLogin isLoggedIn={isLoggedIn}
                                     handleLogin={handleLogin}/>)
                }/>
                <Route path={"/users"} exact component={UsersList} />

                <Route path="/winelog" exact render={
                    () => (currentBatch ? <WineLog batch={currentBatch} /> : <Redirect to={'/'} />)
                } />

                <Route path={'/calc'} exact component={CalculatorPage} />

                <Route path="/" exact render={() => (isLoggedIn && <Redirect to={"/manage"} />)}/>

                {/*Renders warnings for the user to see.*/}
                <ToastContainer className="p-3" position={position}>
                    {toasts}
                </ToastContainer>
            </div>
        </Router>
    );
}

export default App;

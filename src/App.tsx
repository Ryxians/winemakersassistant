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
import wineglass from "./components/login/glass-with-wine.svg";
import {ToastPosition} from "react-bootstrap/ToastContainer";
import {BackendToast} from "./components/BackendToast";
import {User} from "@entities/User"
import {CalculatorPage} from "./components/calculator/page/CalculatorPage";


function App() {
    Axios.defaults.withCredentials = true;
    let position:ToastPosition = 'bottom-end'
    const [toasts, setToasts] = useState<JSX.Element[]>([]);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [render, setRender] = useState<JSX.Element>()

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

    useEffect(() => {
        let usrstr = localStorage.getItem('user');
        if (usrstr) {
            setUser(JSON.parse(usrstr));
            setLoggedIn(true);
        }

        Axios.get('/users/login').then(res => {
            if (res.status === 200) {
                setLoggedIn(true);
                let resUser:User = res.data;
                console.log("Users: ", resUser);
                if (resUser) {
                    setUser(resUser);
                    setRender(
                        <>
                            <Navbar logout={logout} user={resUser}/>
                        </>
                    );
                }
            } else {
                setLoggedIn(false);
                setRender(<Redirect to={'/login'} />);
            }
            console.log("Login Status: ", res.status);
        });
    }, [])

    const logout = () => {
        Axios.post('/users/logout').then(res => {
            console.log("Logout Status: ", res.status);
            setLoggedIn(false);
            setRender(<Redirect to={'/login'} />);
            localStorage.clear();
        });
        // setHashedUser("");
    }

    const handleLogin = (usr:User) => {
        setUser(usr);
        // setHashedUser(hashedUsr);
        // localStorage.setItem("hashedUser", hashedUsr);
        console.log("User:", usr)
        setLoggedIn(true);
        setRender(
            <>
                <Navbar logout={logout} user={usr}/>
            </>
        );

    }



    return (
        <Router>
            <div className="App text-center">
                {render}
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

                <Route path={'/calc'} exact component={CalculatorPage} />

                <Route path="/" exact render={() => (isLoggedIn && <Redirect to={"/manage"} />)}/>

                <ToastContainer className="p-3" position={position}>
                    {toasts}
                </ToastContainer>
            </div>
        </Router>
    );
}

export default App;

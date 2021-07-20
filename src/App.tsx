import React from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import {Start} from "./components/form/start/Start";
import {Login} from "./components/login/Login";

function App() {
    return (
        <div className="App container">
            {/*<Navbar/>*/}
            {/*<Start />*/}
            <Login />
        </div>
    );
}

export default App;

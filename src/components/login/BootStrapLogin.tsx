import './signin.css'
import React, {FC} from 'react';
import wineglass from './glass-with-wine.svg';
import {useForm, SubmitHandler} from "react-hook-form";
import {InputRequiredAlert} from "../sections/InputRequiredAlert";
import {Redirect} from 'react-router-dom';
import Axios from "axios";

interface Props {
    isLoggedIn: boolean
    handleLogin: any
}

type Inputs = {
    username: string,
    password: string
}

// I used the bootstrap sign-in example
// Aug 1, 2021
export const BootStrapLogin: FC<Props> = ({isLoggedIn, handleLogin}) => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async user => {
        await Axios.post('/users/login', user)
            .then(res => {
                console.log("Status: " + res.status);
                if (res.status === 200) {
                    handleLogin(res.data);
                } else {
                    switch (res.status) {
                        case 403:
                            setError("password", {
                                type: "manual",
                                message: "Incorrect Password"
                            });
                            break;
                        case 400:
                            setError("username", {
                                type: "manual",
                                message: "Username not found."
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
    };

    return (
        <div className="hotbod text-center">
            <div className="form-signin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <img className="mb-4" src={wineglass} alt="" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Wine Maker's Assistant</h1>

                    <div className="form-floating pb-1">
                        <input type="text"
                               className="form-control"
                               id="floatingInput"
                               placeholder="username"
                               {...register("username", {required: true})}/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    {errors.username && <InputRequiredAlert>
                        {errors.username.message ? errors.username.message : "Username Required"}
                    </InputRequiredAlert>}
                    <div className="form-floating">
                        <input type="password"
                               className="form-control"
                               id="floatingPassword"
                               placeholder="Password"
                               {...register("password", {required: true})}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    {errors.password && <InputRequiredAlert>
                        {errors.password.message ? errors.password.message : "Password Required"}
                    </InputRequiredAlert>}

                    <button className="w-100 btn btn-lg btn-primary mt-1" type="submit">Sign in</button>
                </form>
            </div>
            <div className="fixed-bottom text-muted">
                <span>Icons made by </span>
                <a href="https://www.freepik.com"
                   title="Freepik">Freepik</a>
                <span> from </span>
                <a href="https://www.flaticon.com/"
                   title="Flaticon">www.flaticon.com</a>
            </div>
            {isLoggedIn && (<Redirect to={{pathname: '/'}} />)}
        </div>
    );
};
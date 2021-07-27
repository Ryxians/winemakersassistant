import React, {FC} from 'react';
import wineglass from './glass-with-wine.svg';
import {useForm, SubmitHandler} from "react-hook-form";

interface Props {

}

type Inputs = {
    username: string,
    password: string
};

export const Login: FC<Props> = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async user => {

        console.log(JSON.stringify(user))
        await fetch('/login',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            }).then(res => console.log("Status: " + res.status));
    };

    console.log(errors);
    return (
        <div className="text-center">
            <main className="form-signin">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="h1 pt-3 pb-0 mb-0">
                        Wine Maker's Assistant
                        <img
                            className="mb-4"
                            src={wineglass} alt=""
                            width="72" height="57"/>
                    </p>
                    <p className="h4 pt-0 text-muted">Sign In</p>
                    <div className="form-floating pb-1">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingUsername"
                            placeholder="Username"
                            autoComplete="off"
                            {...register("username")}
                        />
                        <label htmlFor="floatingUsername">Username</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            autoComplete="off"
                            {...register("password")}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
                </form>
            </main>
            <div className="fixed-bottom text-muted">Icons made by <a href="https://www.freepik.com"
                                                                      title="Freepik">Freepik</a> from <a
                href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    );
};
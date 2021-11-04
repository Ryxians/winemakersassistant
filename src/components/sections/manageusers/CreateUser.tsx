import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import Axios from "axios";

interface Props {

}

interface Inputs {
    username: string,
    password: string,
    role: number
}

export const CreateUser: FC<Props> = () => {
    const {register, handleSubmit, setError, formState: {errors}} = useForm<Inputs>();

    const onSubmit = (user:Inputs) => {
        Axios.post('/users/new', user);
    }
    return (
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
            <h3>Create User: </h3>
            <div className="input-group">
          <span className="input-group-text">
              Username:
          </span>
                <input type="text"
                       className="form-control"
                       {...register("username")}
                />
            </div>
            <div className="input-group">
                <span className="input-group-text">
                    Password:
                </span>
                <input type="text"
                       className="form-control"
                       {...register("password")}
                />
            </div>
            <div className="input-group">
                <span className="input-group-text">
                    Role:
                </span>
                <select className="form-select"
                        {...register("role")}
                >
                    <option value="-1">Observer</option>
                    <option selected value="0">Maker</option>
                    <option value="1">Admin</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary m-1">Add</button>
        </form>
    );
};
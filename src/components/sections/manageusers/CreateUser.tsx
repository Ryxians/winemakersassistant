import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import Axios from "axios";


interface Props {
    updateUsers: Function
}

interface Inputs {
    username: string,
    password: string,
    role: number
}

export const CreateUser: FC<Props> = ({updateUsers}) => {
    const {register, handleSubmit} = useForm<Inputs>();
    const onSubmit = (user: Inputs) => {
        Axios.post('/users/new', user).then(res => {
            updateUsers();

        });
    }
    return (
        <>
            <div className="modal fade" id="createUser">
                <div className="modal-dialog modal-fullscreen-md-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Create User: </h3>
                        </div>
                        <form className="container" onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className="input-group">
                                    <span className="input-group-text"> Username: </span>
                                    <input type="text"
                                           className="form-control"
                                           {...register("username")}
                                    />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Password: </span>
                                    <input type="text"
                                           className="form-control"
                                           {...register("password")}
                                    />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Role:</span>
                                    <select className="form-select"
                                            defaultValue="0"
                                            {...register("role")}
                                    >
                                        <option value="-1">Observer</option>
                                        <option value="0">Maker</option>
                                        <option value="1">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary m-1" data-bs-dismiss="modal">Add
                                </button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#createUser">
                Create User
            </button>
        </>
    );
};
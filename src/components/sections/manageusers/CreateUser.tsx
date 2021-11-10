import React, {FC} from 'react';
import {useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../ModalFB";


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
        <ModalFB className="m-1" handleSubmit={handleSubmit} onSubmit={onSubmit} id={"createUser"} title={"Create User"}>
            <>
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
            </>
        </ModalFB>
    );
};
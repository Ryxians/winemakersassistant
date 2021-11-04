import React, {FC, useEffect, useState} from 'react';
import {User} from '@entities/User'
import Axios from "axios";
import {CreateUser} from "./CreateUser";

interface Props {

}

export const UsersList: FC<Props> = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        Axios.get('/users/get')
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
            })
    }, []);
    return (
        <div className={"container"}>
            <CreateUser />
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col">Active</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? users.map(({id, username, role, active}) => (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{username}</td>
                        <td>{role}</td>
                        <td>{active}</td>
                    </tr>))
                    :
                    <tr>
                        <td>?</td>
                        <td>No Users Loaded</td>
                        <td></td>
                        <td></td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
};
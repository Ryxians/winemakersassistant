import React, {FC, useEffect, useState} from 'react';
import {User} from '@entities/User'
import Axios from "axios";
import {CreateUser} from "./CreateUser";
import {ModifyUser} from "./ModifyUser";
import 'bootstrap/js/dist/modal';

interface Props {

}

export const UsersList: FC<Props> = () => {
    const [users, setUsers] = useState<User[]>([]);
    const updateUsers = () => {
        try {
        Axios.get('/users/get')
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
                console.log("User Status: ", res.status);
            })
        } catch (e) {

        }
    }
    useEffect(() => {
        updateUsers();
    }, []);
    return (
        <>
        <div className={"container d-print-none"}>
            <CreateUser updateUsers={updateUsers}/>

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
                {users.length > 0 ? users.map((user) => (<ModifyUser key={user.id} user={user}/>))
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
            <div className="d-none d-print-block"><h1 className="text-danger">You aren't allowed to print users</h1></div>
        </>
    );
};
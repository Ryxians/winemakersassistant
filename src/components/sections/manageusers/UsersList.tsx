import React, {FC, useEffect, useState} from 'react';
import {User} from '@entities/User'

interface Props {

}

export const UsersList: FC<Props> = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        fetch('/users/get', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(async response => {
                if (response.status === 200) {
                    setUsers(await response.json());
                }
            })
    }, []);
    return (
        <div>
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
                {users.map(({id, username, role, active}) => (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{username}</td>
                        <td>{role}</td>
                        <td>{active}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
};
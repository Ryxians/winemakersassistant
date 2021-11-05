import React, {FC, useEffect, useState} from 'react';
import {User} from '@entities/User';
import 'bootstrap/js/dist/modal';
import {useForm} from "react-hook-form";
import Axios from "axios";

interface Props {
    user: User
}

interface Inputs {
    username: string,
    password: string,
    role: number,
    active: boolean
}

export const ModifyUser : FC<Props> = ({user}) => {
    const {register, handleSubmit, setValue, getValues, unregister} = useForm<Inputs>({
        defaultValues: user
    });
    const {id, username, role, active} = user;
    let btn: HTMLButtonElement | null;
    const [isOpen, setOpen] = useState(false);

    const onSubmit = (updated:User) => {
        Axios.put(`/users/put/${updated.id}`, updated).then(
            res => console.log("Update Status: ", res.status)
        )
    }


    return (
  <>
      <tr>
          <td><button className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#mod-${id}`}>{id}</button></td>
          <td>{username}</td>
          <td>{role}</td>
          <td>{active}
              <div className="modal fade" id={`mod-${id}`}>
                  <div className="modal-dialog" data-bs-backdrop="static">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title">Modify {username}</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="modal-body">
                                  <div className="input-group" >
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
                                      <div className="form-check form-switch" >
                                          <input className="form-check-input" type="checkbox"
                                                 {...register("active")}
                                          />
                                          <span className="form-check-label">Active</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Save changes</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </td>
      </tr>
  </>
 );
};
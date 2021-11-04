import React, {FC} from 'react';
import {Batch} from '@server/database/entities/Batch'
import {Blended_Batch} from '@entities/Blended_Batch'
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import Axios from "axios";

interface Racking {
    batch_id:number
    racking_date: Date
    sg: number
    temperature: number
    sulfite: number
    sorbate: number
    new_tank: string
    notes:string
}

interface Props {
    batch: Batch | Blended_Batch | undefined
}

export const RackingC : FC<Props> = ({batch}) => {
    const {handleSubmit, register} = useForm<Racking>();

    const onSubmit = (racking:Racking) => {
        // @ts-ignore
        // There is an error in which batch may be undefined
        // However, if batch is undefined then the page is set to redirect.
        // So batch should never be undefined.
        racking.batch_id = batch.batch_id;
        Axios.post('/wine/add/racking', racking);
        // fetch('/wine/add/racking',
        //     {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(racking)
        //     });
    }
 return (
  <form onSubmit={handleSubmit(onSubmit)}>
      {!batch && <Redirect to={{pathname: "/"}} /> }

      <h3>Racking Update</h3>
      <div className="input-group">
                <span className="input-group-text">
                    Date of Racking
                </span>
          <input type="datetime-local"
                 className="form-control" {...register("racking_date")}/>
      </div>

      <div className="input-group">
                <span className="input-group-text">
                    Racked SG
                </span>
          <input type="number"
                 className="form-control"
                 {...register("sg")}
          />
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Racked Temperature
                </span>
          <input type="number"
                 className="form-control"
                 {...register("temperature")}
          />
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Sulfite
                </span>
          <input type="number"
                 className="form-control"
                 {...register("sulfite")}
          />
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Sorbate
                </span>
          <input type="number"
                 className="form-control"
                 {...register("sorbate")}
          />
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    New Tank
                </span>
          <input type="text"
                 className="form-control"
                 {...register("new_tank")}
          />
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Notes
                </span>
          <input type="text"
                 className="form-control"
                 {...register("notes")}
          />
      </div>
      <button type="submit" className="btn btn-primary m-1">Add</button>
  </form>
 );
};
import React, {FC} from 'react';
import {Batch} from '@server/database/entities/Batch'
import {Blended_Batch} from '@entities/Blended_Batch'
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";

interface Fermentation {
    batch_id:number
    fermentation_date: Date
    sg: number
    temperature: number
    notes: string
}

interface Props {
    batch: Batch | Blended_Batch | undefined
}

export const FermentationC : FC<Props> = ({ batch }) => {
    const {handleSubmit, register} = useForm<Fermentation>();

    const onSubmit = (ferment:Fermentation) => {
        // @ts-ignore
        // There is an error in which batch may be undefined
        // However, if batch is undefined then the page is set to redirect.
        // So batch should never be undefined.
        ferment.batch_id = batch.batch_id;
        fetch('/wine/add/fermentation',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(ferment)
            });
    }

 return (
  <form onSubmit={handleSubmit(onSubmit)} className="container">
      {!batch && <Redirect to={{pathname: "/"}} /> }

      <h3>Fermentation Update</h3>
      <div className="input-group">
                <span className="input-group-text">
                    Date of Fermentation Check
                </span>
          <input type="datetime-local"
                 className="form-control" {...register("fermentation_date")}/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    New SG Level
                </span>
          <input type="number"
                 className="form-control" {...register("sg")}/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Current Temperature
                </span>
          <input type="number"
                 className="form-control" {...register("temperature")}/>
      </div>
      <div className="input-group">
                <span className="input-group-text">
                    Notes
                </span>
          <input type="text"
                 className="form-control" {...register("notes")}/>
      </div>
      <button type="submit" className="btn btn-primary m-1">Add</button>
  </form>
 );
};
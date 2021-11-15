import React, {FC} from 'react';
import {Batch} from '@entities/Batch'
import {useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";

interface Fermentation {
    batch_id: number
    date: Date
    sg: number
    temperature: number
    notes: string
}

interface Props {
    batch: Batch
    ferm?: Fermentation
    name?: string
    className?: string
}

export const FermentationC: FC<Props> = ({batch, ferm, name, className}) => {

    const {handleSubmit, register, setValue} = useForm<Fermentation>({
        defaultValues: ferm
    });

    const onSubmit = async (ferment: Fermentation) => {
        // @ts-ignore
        // There is an error in which batch may be undefined
        // However, if batch is undefined then the page is set to redirect.
        // So batch should never be undefined.
        ferment.batch_id = batch.batch_id;
        if (!ferm) {
            await Axios.post('/wine/add/fermentation', ferment);
        } else {
            await Axios.put('/wine/put/fermentation/', ferment);
        }
    }

    let id = "ferment-";
    id += ferm ? ferm.date.getDay() : batch.batch_id;

    return (
        <ModalFB id={id} handleSubmit={handleSubmit} onSubmit={onSubmit} title={name ? name : "Fermentation"}
                 modalception={true} className={className}>
            <>
                <div className="input-group">
                <span className="input-group-text">
                    Date of Fermentation Check
                </span>
                    <input type="datetime-local"
                           className="form-control" {...register("date")}/>
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
            </>
        </ModalFB>
    );
};
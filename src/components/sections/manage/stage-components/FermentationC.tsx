import React, {FC, useState} from 'react';
import {Batch} from '@entities/Batch'
import {useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";
import {PopoverInfo} from "../../../PopoverInfo";
import {sgBody} from "./SGBody";

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
    const [submitButton, setSubmit] = useState<HTMLButtonElement>();


    const onSubmit = async (ferment: Fermentation) => {
        ferment.batch_id = batch.batch_id;
        let res;
        if (!ferm) {
            res = await Axios.post('/wine/add/fermentation', ferment);
        } else {
            res = await Axios.put('/wine/put/fermentation/', ferment);
        }

        if (res.status === 201) {
            submitButton?.click();
        }
    }

    let id = "ferment-";
    id += ferm ? ferm.date.getDay() : batch.batch_id;

    return (
        <ModalFB id={id} handleSubmit={handleSubmit} onSubmit={onSubmit} title={name ? name : "Fermentation"}
                 modalception={true} className={className}
                 setSubmit={setSubmit}
        >
            <>
                <div className="input-group">
                <span className="input-group-text">
                    Date of Fermentation Check
                </span>
                    <input type="datetime-local"
                           className="form-control" {...register("date",
                        {required:true})}/>
                </div>
                <div className="input-group">
                <span className="input-group-text">
                    New SG Level
                </span>
                    <PopoverInfo id={id + "-NewFermentSG"} header={"New Specific Gravity"}
                                 body={sgBody}>

                        <input type="number"
                               className="form-control" {...register("sg")}/>
                    </PopoverInfo>
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
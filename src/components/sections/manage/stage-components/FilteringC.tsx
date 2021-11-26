import React, {FC, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from '@entities/Blended_Batch'
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";
import {PopoverInfo} from "../../../PopoverInfo";
import {sgBody} from "./SGBody";

interface Filtering {
    batch_id: number
    date: Date
    sg: number
    new_tank: string
    notes: string
}

interface Props {
    batch: Batch
}

export const FilteringC: FC<Props> = ({batch}) => {
    const {handleSubmit, register} = useForm<Filtering>();
    const [submitButton, setSubmit] = useState<HTMLButtonElement>();

    const onSubmit = async (filter: Filtering) => {
        // @ts-ignore
        // There is an error in which batch may be undefined
        // However, if batch is undefined then the page is set to redirect.
        // So batch should never be undefined.
        filter.batch_id = batch.batch_id;
        let res = await Axios.post('/wine/add/filtering', filter);

        if (res.status === 201) {
            submitButton?.click();
        }
    }
    return (
        <ModalFB modalception={true} id={`filtering-${batch.batch_id}`} handleSubmit={handleSubmit} onSubmit={onSubmit}
                 title={"Filtering"}
                 setSubmit={setSubmit}
        >
            <>
                <div className="input-group">
                <span className="input-group-text">
                    Date of Filtering
                </span>
                    <input type="datetime-local"
                           className="form-control" {...register("date")}/>
                </div>

                <div className="input-group">
                <span className="input-group-text">
                    Filtered SG
                </span>
                    <PopoverInfo id={`filtering-${batch.batch_id}` + "-FilteredSG"}
                                 header={"Filtered Specific Gravity"}
                                 body={sgBody}>

                        <input type="number"
                               className="form-control"
                               {...register("sg")}
                        />
                    </PopoverInfo>
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
            </>
        </ModalFB>
    );
};
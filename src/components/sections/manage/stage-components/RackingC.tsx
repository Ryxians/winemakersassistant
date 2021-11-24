import React, {FC} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from '@entities/Blended_Batch'
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";

interface Racking {
    batch_id: number
    date: Date
    sg: number
    temperature: number
    sulfite: number
    sorbate: number
    kieselsol: number
    new_tank: string
    notes: string
}

interface Props {
    batch: Batch
    racking?: Racking
    name?: string
    className?: string
}

export const RackingC: FC<Props> = ({batch, racking, name, className}) => {
    const {handleSubmit, register} = useForm<Racking>();
    let modalId = `racking-${batch.batch_id}`
    const groupClass = 'input-group';
    const inputLabelClass = 'input-group-text';
    const inputClass = 'form-control';

    const onSubmit = async (racking: Racking) => {
        racking.batch_id = batch.batch_id;
        if (racking) {
            await Axios.post('/wine/add/racking', racking);
        } else {
            // Implement Racking Put
        }
    }
    return (
        <ModalFB id={modalId}
                 title={name ? name : "Racking"}
                 onSubmit={onSubmit}
                 handleSubmit={handleSubmit}
                 modalception={true}
                 className={className}>
            <>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Date of Racking
                </span>
                    <input type="datetime-local"
                           className={inputClass} {...register("date")}/>
                </div>

                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Racked SG
                </span>
                    <input type="number"
                           className={inputClass}
                           {...register("sg")}
                    />
                </div>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Racked Temperature
                </span>
                    <input type="number"
                           className={inputClass}
                           {...register("temperature")}
                    />
                </div>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Sulfite
                </span>
                    <input type="number"
                           className={inputClass}
                           {...register("sulfite")}
                    />
                </div>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Sorbate
                </span>
                    <input type="number"
                           className={inputClass}
                           {...register("sorbate")}
                    />
                </div>
                <div className={groupClass}>
                    <span className={inputLabelClass}>
                        Kieselsol:
                    </span>
                    <input type="number"
                    className={inputClass}
                        {...register("kieselsol")}/>

                </div>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    New Tank
                </span>
                    <input type="text"
                           className={inputClass}
                           {...register("new_tank")}
                    />
                </div>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Notes
                </span>
                    <input type="text"
                           className={inputClass}
                           {...register("notes")}
                    />
                </div>
            </>
        </ModalFB>
    );
};
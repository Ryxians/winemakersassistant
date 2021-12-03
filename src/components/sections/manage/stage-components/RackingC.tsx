import React, {FC, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from '@entities/Blended_Batch'
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {ModalFB} from "../../ModalFB";
import {PopoverInfo} from "../../../PopoverInfo";
import {sgBody} from "./SGBody";
import {AlcoholTest, factors} from "../../../calculator/alctest/AlcoholTest";

interface Racking {
    batch_id: number
    date: Date
    sg: number
    temperature: number
    sulfite: number
    sorbate: number
    kieselsol: number
    isinglass: number
    sgFactor: number
    alc: number
    volume: number
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

    const [close, setClose] = useState<Function>(() => {});
    const {handleSubmit, register} = useForm<Racking>();
    let modalId = `racking-${batch.batch_id}`
    const groupClass = 'input-group';
    const inputLabelClass = 'input-group-text';
    const inputClass = 'form-control';

    const onSubmit = async (racking: Racking) => {
        racking.batch_id = batch.batch_id;
        let res;
        if (racking) {
            res = await Axios.post('/wine/add/racking', racking);
        } else {
            // Implement Racking Put
            res = await Axios.post('/wine/add/racking', racking);
        }

        if (res.status === 201) {
            close();
        }
    }
    return (
        <ModalFB id={modalId}
                 title={name ? name : "Racking"}
                 onSubmit={onSubmit}
                 handleSubmit={handleSubmit}
                 setClose={setClose}
        >
            <>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Date of Racking
                </span>
                    <input type="datetime-local"
                           className={inputClass} {...register("date",
                        {required: true})}/>
                </div>

                <div className={groupClass}>
                <span className={inputLabelClass}>
                    Racked SG
                </span>
                    <PopoverInfo id={modalId + "-RackedSG"}
                                 header={"Racked Specific Gravity"}
                                 body={sgBody}>

                        <input type="number"
                               step={.001}
                               className={inputClass}
                               {...register("sg", {required: true})}
                        />
                    </PopoverInfo>
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
                <PopoverInfo id={modalId + "-Sulfite"} header={"Sulfite"}
                             body={"Sulfite information can be found in the kit information."}>

                    <div className={groupClass}>
                <span className={inputLabelClass}>
                    Sulfite
                </span>
                        <input type="number"
                               className={inputClass}
                               {...register("sulfite")}
                        />
                    </div>
                </PopoverInfo>
                <PopoverInfo id={modalId + "-Sorbate"} header={"Sorbate"}
                             body={"Sorbate information can be found in the kit information"}>

                    <div className={groupClass}>
                <span className={inputLabelClass}>
                    Sorbate
                </span>
                        <input type="number"
                               className={inputClass}
                               {...register("sorbate")}
                        />
                    </div>
                </PopoverInfo>
                <PopoverInfo id={modalId + "-Kieselsol"} header={"Kieselsol"}
                             body={"Kieselsol information is found in the kit information."}>

                    <div className={groupClass}>
                    <span className={inputLabelClass}>
                        Kieselsol:
                    </span>
                        <input type="number"
                               className={inputClass}
                               {...register("kieselsol")}/>

                    </div>
                </PopoverInfo>
                <PopoverInfo id={modalId + "-isinglass"} header={"Isinglass"}
                             body={"Isinglass information is found in the kit information."}>
                    <div className={groupClass}>
                    <span className={inputLabelClass}>
                        Isinglass:
                    </span>
                        <input type="number"
                               className={inputClass}
                               {...register("isinglass")}/>

                    </div>
                </PopoverInfo>
                <PopoverInfo id={modalId + "-SGFactor"}
                             header={"SG Factors"}
                             placement={"right"}
                             body={factors}>
                    <div className={groupClass}>
                    <span className={inputLabelClass}>
                        SG Factor:
                    </span>
                        <input type="number"
                               className={inputClass}
                               step={.001}
                               {...register("sgFactor")}/>

                    </div>
                </PopoverInfo>
                <PopoverInfo id={modalId + "-ALCTest"} header={"ALC Test"}
                             body={"The Alcohol Calculator can be found in the Calculators tab."}>
                    <div className={groupClass}>
                    <span className={inputLabelClass}>
                        ALC %:
                    </span>
                        <input type="number"
                               className={inputClass}
                               step={.001}
                               {...register("alc")}/>

                    </div>
                </PopoverInfo>
                <div className={groupClass}>
                    <span className={inputLabelClass}>
                        Vol. Level:
                    </span>
                    <input type="number"
                           step={.001}
                           className={inputClass}
                           {...register("volume", {required: true})}/>

                </div>
                <div className={groupClass}>
                <span className={inputLabelClass}>
                    New Tank
                </span>
                    <input type="text"
                           className={inputClass}
                           {...register("new_tank", {required: true})}
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
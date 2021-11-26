import React, {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NewKitC} from "./NewKitC";
import {Wine} from "@entities/Wine"
import Axios from "axios";
import {ModalFB} from "../../ModalFB";

interface Props {

}

interface Inputs {
    wine_id: number
    start_date: Date
    kit_amount: number
    brix: number
    sg: number
    starting_tank: string
    temperature: number
    notes: string

}

export const NewBatchC: FC<Props> = () => {
    interface wine {
        wine_id: number
        fancy_name: string
        wine_style: string
    }

    const [wines, setWines] = useState<wine[]>([]);
    const [isNew, setNew] = useState(false);
    const [submitButton, setSubmit] = useState<HTMLButtonElement>()

    const {handleSubmit, register, setValue} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async newBatch => {
        Axios.post('/wine/add/batch', newBatch).then(res => {
            if (res.status === 201) {
                submitButton?.click();
            }
        });
    }

    const getWines = async (wine_id?: number) => {
        Axios.get('/wine/get/kit').then(res => {
            if (res.status === 200) {
                let wines = res.data;
                wines = wines.filter((w:Wine) => {
                    if (w.wine_style !== "BLENDED") {
                        return w;
                    }
                });
                setWines(wines);
                wine_id && setValue("wine_id", wine_id);
            } else {
                setWines([
                    {
                        wine_id: 0,
                        wine_style: "ERROR",
                        fancy_name: "ERROR"
                    }
                ]);
            }
        });
    }
    return (
        <>

            <ModalFB handleSubmit={handleSubmit} onSubmit={onSubmit} title={"New Batch"} id={"CreateBatchModal"}
                     setSubmit={setSubmit}
                     onClick={() => {
                         getWines().then();
                     }}
            >
                <>
                    <div className="input-group">
                        <span className="input-group-text">Select Wine (Kit)</span>
                        <select defaultValue={-1} className="form-select"
                                {...register("wine_id")}>
                            <option value={-1}>Choose a wine!</option>
                            {wines.map(({wine_id, fancy_name}) =>
                                (<option value={wine_id} key={wine_id}> {fancy_name} </option>)
                            )}
                        </select>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Current Date & Time</span>
                        <input type="datetime-local"
                               className="form-control"
                               {...register("start_date")}
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Number of Kits</span>
                        <input type="number" className="form-control"
                               {...register("kit_amount")}
                        />
                    </div>
                    <div className="input-group">
                <span className="input-group-text">
                    Brix Amount
                </span>
                        <input type="number" step={.001}
                               className="form-control"
                               {...register("brix")}
                        />
                    </div>
                    <div className="input-group">
                <span className="input-group-text">
                    SG Amount
                </span>
                        <input type="number" step={.001}
                               className="form-control"
                               {...register("sg")}
                        />
                    </div>
                    <div className="input-group">
                <span className="input-group-text">
                  Starting Tank
                </span>
                        <input type="text"
                               className="form-control"
                               {...register("starting_tank")}
                        />
                    </div>
                    <div className="input-group">
                <span className="input-group-text">
                    Temperature
                </span>
                        <input type="number" step={.01}
                               className="form-control"
                               {...register("temperature")}
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
        </>
    );
};
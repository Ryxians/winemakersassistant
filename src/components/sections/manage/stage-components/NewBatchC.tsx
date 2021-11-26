import React, {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NewKitC} from "./NewKitC";
import {Wine} from "@entities/Wine"
import Axios from "axios";
import {ModalFB} from "../../ModalFB";
import {InputRequiredAlert} from "../../InputRequiredAlert";
import {PopoverInfo} from "../../../PopoverInfo";
import {sgBody} from "./SGBody";

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

    const {handleSubmit, register, setValue, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async newBatch => {
        Axios.post('/wine/add/batch', newBatch).then(res => {
            if (res.status === 201) {
                submitButton?.click();
            }
        });
    }

    const brixBody =
        (<>
            <ol>
                <li>Measure out about a cup.</li>
                <li>Fill the hydrometer tube up to about 2 inches from the top.</li>
                <li>Insert the hydrometer.</li>
                <li>Look where the liquid intersects the markings on the hydrometer.</li>
                <li>Record the brix reading.</li>
            </ol>
            <p>Brix numbers range from 0-35.</p>
        </>);

    const getWines = async (wine_id?: number) => {
        Axios.get('/wine/get/kit').then(res => {
            if (res.status === 200) {
                let wines = res.data;
                wines = wines.filter((w: Wine) => {
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

            <ModalFB handleSubmit={handleSubmit}
                     onSubmit={onSubmit}
                     title={"New Batch"}
                     id={"CreateBatchModal"}
                     setSubmit={setSubmit}
                     onClick={() => {
                         getWines().then();
                     }}
            >
                <>
                    <div className="input-group">
                        <span className="input-group-text">Select Wine (Kit)</span>
                        <select defaultValue={-1}
                                className="form-select"
                                {...register("wine_id",
                                    {required: true}
                                )}>
                            <option value={-1}>Choose a wine!</option>
                            {wines.map(({wine_id, fancy_name}) =>
                                (<option value={wine_id} key={wine_id}> {fancy_name} </option>)
                            )}
                        </select>
                    </div>
                    {errors.wine_id && <InputRequiredAlert>No Wine Selected</InputRequiredAlert>}

                    <div className="input-group">
                        <span className="input-group-text">Current Date & Time</span>
                        <input type="datetime-local"
                               className="form-control"
                               {...register("start_date",
                                   {required: true})}
                        />
                    </div>
                    {errors.start_date && <InputRequiredAlert>Date Required</InputRequiredAlert>}
                    <div className="input-group">
                        <span className="input-group-text">Number of Kits</span>
                        <PopoverInfo id={"NewBatchNumberOfKits"}
                                     header={"Number of Kits"}
                                     body={"How many boxes of kits?"}>

                            <input type="number" className="form-control"
                                   {...register("kit_amount",
                                       {required: true})}
                            />
                        </PopoverInfo>
                    </div>
                    {errors.kit_amount && <InputRequiredAlert>Kit Amount Required</InputRequiredAlert>}
                    <div className="input-group">
                <span className="input-group-text">
                    Brix Before Water Added
                </span>
                        <PopoverInfo id={"NewBatchBrix"} header={"Brix Before Water Add"}
                                     body={brixBody}>

                            <input type="number" step={.001}
                                   className="form-control"
                                   {...register("brix",
                                       {required: true})}
                            />
                        </PopoverInfo>
                    </div>
                    {errors.brix && <InputRequiredAlert>Brix Required</InputRequiredAlert>}
                    <div className="input-group">
                <span className="input-group-text">
                    SG Amount
                </span>
                        <PopoverInfo id={"NewBatchSG"} header={"Specific Gravity Amount"}
                                     body={sgBody}>

                            <input type="number" step={.001}
                                   className="form-control"
                                   {...register("sg")}
                            />
                        </PopoverInfo>
                    </div>
                    <div className="input-group">
                <span className="input-group-text">
                  Starting Tank
                </span>
                        <PopoverInfo id={"NewBatchTank"} header={"Starting Tank"}
                                     body={"What tank is being used?"}>

                            <input type="text"
                                   className="form-control"
                                   {...register("starting_tank",
                                       {required: true})}
                            />
                        </PopoverInfo>
                    </div>
                    {errors.starting_tank && <InputRequiredAlert>Starting Tank Required</InputRequiredAlert>}
                    <div className="input-group">
                <span className="input-group-text">
                    Temperature
                </span>
                        <input type="number" step={.01}
                               className="form-control"
                               {...register("temperature",
                                   {required: true})}
                        />
                    </div>
                    {errors.temperature && <InputRequiredAlert>Temperature Required</InputRequiredAlert>}
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
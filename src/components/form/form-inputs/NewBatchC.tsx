import React, {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {NewKitC} from "./NewKitC";

interface Props {

}

interface Inputs {
    wine_id:number
    start_date: Date
    kit_amount:number
    brix:number
    sg:number
    starting_tank:string
    temperature:number
    notes:string

}

export const NewBatchC: FC<Props> = () => {
    interface wine {
        wine_id: number
        fancy_name: string
        wine_style: string
    }

    const [wines, setWines] = useState<wine[]>([]);
    const [isNew, setNew] = useState(false);

    const {handleSubmit, register, setValue, getValues, watch, trigger} = useForm<Inputs>();
    const onSubmit:SubmitHandler<Inputs> = async newBatch => {
        await fetch(
            '/wine/add/batch',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newBatch)
            }
        );
    }

    const getWines = () => {
        fetch('/wine/get/kit',
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(async res => {
            console.log("Status: " + res.status);
            if (res.status === 200) {
                const rWines: wine[] = await res.json();
                setWines(rWines);
            } else {
                setWines([
                    {
                        wine_id: 0,
                        wine_style: "ERROR",
                        fancy_name: "ERROR"
                    }
                ]);
            }
        })
    }

    useEffect( () => {
        try {
            wines.length === 0 && getWines();
        } catch (e) {
            // Haha error :o
        }

        let wineid = watch("wine_id");
        !isNew && (wineid == -1 && setNew(true));
        isNew && (wineid != -1 && setNew(false));
    })
    return (
        <form className="container" onSubmit={handleSubmit(onSubmit)}>
            <h2>New Batch</h2>
            <div className="input-group">
                <span className="input-group-text">Select Wine (Kit)</span>
                <select className="form-select"
                        {...register("wine_id")}>
                    <option selected>Choose a wine!</option>
                    <option value="-1">New Wine</option>
                    {wines.map(({wine_id, wine_style, fancy_name}) =>
                        (<option value={wine_id} key={wine_id}> {fancy_name} </option>)
                    )}
                </select>
            </div>
            {
                isNew && <NewKitC />
            }
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
                <input type="number"
                       className="form-control"
                       {...register("brix")}
                />
            </div>
            <div className="input-group">
                <span className="input-group-text">
                    SG Amount
                </span>
                <input type="number"
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
                <input type="number"
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
            <button type="submit" className="btn btn-primary m-1">Next</button>
        </form>
    );
};
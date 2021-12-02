import React, {FC, useEffect, useState} from 'react';
import {ModalFB} from "../../ModalFB";
import {set, useForm} from "react-hook-form";
import {Batch} from "@entities/Batch"
import {Blended_Batch} from "@entities/Blended_Batch"
import Axios from "axios";
import {Wine} from '@entities/Wine'
import {FormControl, InputGroup} from "react-bootstrap";
import {InputRequiredAlert} from "../../InputRequiredAlert";
import {PopoverInfo} from "../../../PopoverInfo";

interface Props {
    batch: Batch
    blends: Blended_Batch[]
}

interface BlendedBatch {
    wine_id: number
    date: Date
    tank: string
}

interface Blending {
    blend_id: number | undefined
    batch_id: number
    gallons_used: number
    date: Date
}

export const BlendC: FC<Props> = ({batch, blends}) => {
    const {handleSubmit, register, setValue, setError, formState: {errors}} = useForm<Blending & BlendedBatch>();

    const [submitButton, setSubmit] = useState<HTMLButtonElement>()

    interface wine {
        wine_id: number
        fancy_name: string
        wine_style: string
    }

    const [wines, setWines] = useState<wine[]>([]);

    const getWines = async (wine_id?: number) => {
        Axios.get('/wine/get/kit').then(res => {
            if (res.status === 200) {
                let wines = res.data;
                wines = wines.filter((w: Wine) => {
                    if (w.wine_style === "BLENDED") {
                        return w;
                    }
                });
                setWines(wines);
                wine_id && setValue("wine_id", wine_id);
            } else {
                setWines([{
                    wine_id: 0,
                    wine_style: "ERROR",
                    fancy_name: "ERROR"
                }]);
            }
        });
    }

    useEffect(() => {
        getWines().then();
    }, [])

    const onSubmit = (blend: Blending & BlendedBatch) => {

        blend.batch_id = batch.batch_id;
        if (blend.blend_id && blend.blend_id > -1) {
            Axios.post('/wine/add/blend/to/batch/', blend)
                .then(res => {
                    if (res.status === 201) {
                        submitButton?.click();
                    }
                });

        } else if (blend.wine_id && blend.wine_id > -1) {
            blend.blend_id = undefined;
            Axios.post('/wine/add/blend/batch', blend).then(res => {
                if (res.status === 201) {
                    console.log(res.data)
                    let bb: Blended_Batch = res.data;
                    let newBlend: Blending = blend;
                    newBlend.blend_id = bb.blend_id;
                    Axios.post('/wine/add/blend/to/batch/', newBlend)
                        .then(res => {
                            if (res.status === 201) {
                                console.log(res.data)
                                submitButton?.click();
                            }
                        });
                }
            })
        } else {
            setError("blend_id", {message: "You must select an Active Blend or a New Blend!"})
        }

    }
    return (
        <ModalFB handleSubmit={handleSubmit}
                 onSubmit={onSubmit} title={"Blending"} id={`blending-${batch.batch_id}`}
                 modalception={true}
                 setSubmit={setSubmit}
        >
            <>
                <InputGroup>
                    <InputGroup.Text>Date: </InputGroup.Text>
                    <input type={"datetime-local"}
                           className={"form-control"}
                           {...register("date", {required: true})}
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Active Blends: </InputGroup.Text>
                    <FormControl as={"select"}
                                 {...register("blend_id")}
                    >
                        <option value={-1}>Choose a blend!</option>
                        {blends.map(({blend_id, wine}) => <option key={blend_id}
                                                                  value={blend_id}>{wine.fancy_name + ''}</option>)}
                    </FormControl>
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>New Blend: </InputGroup.Text>
                    <FormControl as={"select"}
                                 {...register("wine_id")}
                    >
                        <option value={-1}>Choose a wine!</option>
                        {wines.map(({wine_id, fancy_name}) => <option key={wine_id}
                                                                      value={wine_id}>{fancy_name}</option>)}
                    </FormControl>
                </InputGroup>
                <p className={"text-warning"}>Only provide an Active Blend OR a New Blend. Do not provide both.</p>
                {errors.blend_id && <InputRequiredAlert>{errors.blend_id.message}</InputRequiredAlert>}
                <div className="input-group">
                <span className="input-group-text">
                    Gallons Used:
                </span>
                    <input type="number"
                           className="form-control" {...register("gallons_used", {required: true})}/>
                </div>
                <PopoverInfo id={batch.batch_id + "-BatchBlendTank"} header={"Tank"}
                             body={"You only need to specify the tank if its a new blend."}>

                <div className="input-group">
                <span className="input-group-text">
                    Tank:
                </span>
                    <input type="text"
                           className="form-control" {...register("tank")}/>
                </div>
                </PopoverInfo>
            </>
        </ModalFB>
    );
};
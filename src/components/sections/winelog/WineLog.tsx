import React, {FC, useEffect, useState} from 'react';
import {Wine} from '@server/database/entities/Wine'
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Blend_to_Batch} from '@entities/Blend_to_Batch';
import {Redirect} from "react-router-dom";
import Axios from "axios";
import {FermentWLC} from "./components/ferments/FermentWLC";
import {RackingWl} from "./components/racking/RackingWL";
import {FilteringWl} from "./components/filtering/FilteringWL";
import {FermentWlS} from "./components/ferments/FermentWLS";

interface Props {
    batch: Batch | Blended_Batch
}

export const WineLog: FC<Props> = ({batch}) => {
    let blend;
    const [updatedBlend, setUpdatedBlend] = useState<Blended_Batch>();
    const [render, setRender] = useState<JSX.Element>()

    useEffect(() => {
        if (batch.wine?.wine_style === 'BLENDED') {
            blend = batch as Blended_Batch;
            Axios.get('/wine/get/blend/from/batchs/' + blend.blend_id).then(async res => {
                let updatedBlend:Blended_Batch = res.data;
                console.log("Full blend: ", updatedBlend);
                let batchs = updatedBlend.blend_to_batch.map((wl:Blend_to_Batch) => (
                    <WineLog key={wl.batch_id} batch={wl.batch} />
                ))
                setRender(
                    <>
                        <h2>{updatedBlend.wine.fancy_name}: Blended</h2>
                        {batchs}
                    </>
                )
            })
        } else {
            batch = batch as Batch;
            makeBatchRender(batch);
            Axios.get('/wine/get/batch/from/' + batch.batch_id).then(res => {
            })

        }

    }, [])

    const makeBatchRender = (batch: Batch) => {
        if (batch) {
            let ferm = <FermentWlS batch={batch}/>;
            let rack = <RackingWl batch={batch}/>;
            let filtering = <FilteringWl/>
            setRender(
                <div>
                    <h2>Wine Log: {batch.wine.fancy_name}</h2>
                    {ferm}
                    {rack}
                    {filtering}
                </div>)
        } else {
            setRender(
                <h5>Loading...</h5>
            )
        }

    }


    const getBatchsFromBlend = async () => {
        // let batchs = await fetch()
        Axios.get(`/wine/get`)
    }

    return (
        <div className="container">

            {render}
        </div>
    );
};
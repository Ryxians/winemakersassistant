import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Blend_to_Batch} from '@entities/Blend_to_Batch';
import Axios from "axios";
import {RackingWLS} from "./components/racking/RackingWLS";
import {FilteringWLC} from "./components/filtering/FilteringWLC";
import {FermentWlS} from "./components/ferments/FermentWLS";
import "./pagebreak.css";
import {FilteringWLS} from "./components/filtering/FilteringWLS";

interface Props {
    batch: Batch | Blended_Batch
}

export const WineLog: FC<Props> = ({batch}) => {
    // The blend variable is where the blend is stored, if it exists
    let blend;
    // To conditionally change what is displayed based on whether its a blend
    // Create a state for what is rendered.
    const [render, setRender] = useState<JSX.Element>()

    const changeActive = async (id:number) => {
        await Axios.put('/wine/put/batch/active/' + id);
    }

    // This runs when the page loads for the first time
    useEffect(() => {
        // Is the wine a blend?
        if (batch.wine?.wine_style === 'BLENDED') {
            // Initialize blend as a blend
            blend = batch as Blended_Batch;

            // Get an entire record of the blend.
            Axios.get('/wine/get/blend/from/batchs/' + blend.blend_id).then(async res => {
                let updatedBlend:Blended_Batch = res.data;

                // For each batch in the blend, create a new WineLog for that batch.
                let batchs = updatedBlend.blend_to_batch.map((wl:Blend_to_Batch) => (
                    <WineLog key={wl.batch_id} batch={wl.batch} />
                ));

                // Render the collection of batchs.
                setRender(
                    <>
                        <h1 className="display-1">{updatedBlend.wine.fancy_name}: Blended</h1>
                        {batchs.map(b => {

                            return (
                                <div className="border border-3 border-secondary rounded m-1 p-1 pagebreak">
                                    {b}
                                </div>
                            );
                        })}
                    </>
                )
            })
        } else {
            // Treat batch as Batch
            batch = batch as Batch;

            // Call batch render
            makeBatchRender(batch);

        }

    }, [])

    // Render a batch
    const makeBatchRender = (batch: Batch) => {
        if (batch) {
            // Create a Fermentation Section
            let ferm = <FermentWlS batch={batch}/>;

            // Create a Racking section
            let rack = <RackingWLS batch={batch}/>;

            // Create a Filtering Section
            let filtering = <FilteringWLS batch={batch}/>

            // Bottling/Output
            let output = <></>

            // Render the batch with its sections.
            setRender(
                <div>
                    <h2 className="display-3">Wine Log: {batch.wine.fancy_name}</h2>
                    <button className="btn btn-warning d-print-none"
                            onClick={(evt) => {
                                let btn = evt.currentTarget as HTMLButtonElement
                                btn.disabled = true;
                                changeActive(batch.batch_id).then(() => btn.disabled = false)
                            }}
                    >Change Active Status</button>
                    {ferm}
                    {rack}
                    {filtering}
                    {output}
                </div>)
        }
    }

    return (
        <div className="container">
            {render ? (render)
                :
                (<>
                    <h5>Loading...</h5>
                </>)
            }
        </div>
    );
};
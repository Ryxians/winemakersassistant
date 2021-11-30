import React, {FC, useEffect, useState} from 'react';
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Blend_to_Batch} from '@entities/Blend_to_Batch';
import Axios from "axios";
import {RackingWLS} from "./components/racking/RackingWLS";
import {FermentWlS} from "./components/ferments/FermentWLS";
import "./pagebreak.css";
import {FilteringWLS} from "./components/filtering/FilteringWLS";
import {OutputWLS} from "./components/output/OutputWLS";
import {batchSection} from "./components/batchSection";
import {blendSection} from "./components/blendSection";

interface Props {
    batch: Batch | Blended_Batch
    children?:JSX.Element
}

export const WineLog: FC<Props> = ({batch, children}) => {
    const [render, setRender] = useState<JSX.Element>()

    const changeActive = async (id: number) => {
        await Axios.put('/wine/put/batch/active/' + id);
    }

    useEffect(() => {
        if (batch.wine?.wine_style === 'BLENDED') {
            // Is the wine a blend?
            // This runs when the page loads for the first time
            // Create a state for what is rendered.

            // To conditionally change what is displayed based on whether its a blend
            // The blend variable is where the blend is stored, if it exists
            let blend;
            // Initialize blend as a blend
            blend = batch as Blended_Batch;

            // Get an entire record of the blend.
            Axios.get('/wine/get/blend/from/batchs/' + blend.blend_id).then(async res => {
                let updatedBlend: Blended_Batch = res.data;

                // For each batch in the blend, create a new WineLog for that batch.
                let batchs = updatedBlend.blend_to_batch.map((wl: Blend_to_Batch) => (
                    <WineLog key={wl.batch_id} batch={wl.batch} />
                ));

                // Render the collection of batchs.
                setRender(
                    <>
                        <h1 className="display-1">{updatedBlend.wine.fancy_name}: Blended</h1>
                        {blendSection(updatedBlend)}
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

    }, []);



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
            let output = <OutputWLS batch={batch}/>

            // Render the batch with its sections.
            setRender(
                <div>
                    <h2 className="display-3">Wine Log: {batch.wine.fancy_name}</h2>
                    {children}
                    <button className="btn btn-warning d-print-none"
                            onClick={(evt) => {
                                // Get button and disable it
                                let btn = evt.currentTarget as HTMLButtonElement
                                btn.disabled = true;

                                // After results have been changed, enable the button
                                changeActive(batch.batch_id).then(() => btn.disabled = false)
                            }}
                    >Change Active Status
                    </button>
                    {batchSection(batch)}
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
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
    let render;
    let blend;
    if (batch.wine.wine_style === 'BLENDED') {
        blend = batch as Blended_Batch;
        let btb:Blend_to_Batch[] = blend.blend_to_batch;
        let batchs = btb.map(bb => <WineLog batch={bb.batch} />);

        render =
            <>
                <h3>Blended</h3>
                {batchs}
            </>
    } else {
        batch = batch as Batch;
        let ferm = <FermentWlS batch={batch}/>;
        let rack = <RackingWl batch={batch}/>;
        let filtering = <FilteringWl/>
        render =
            <div>
                {ferm}
                {rack}
                {filtering}
            </div>
    }

    const getBatchsFromBlend = async () => {
        // let batchs = await fetch()
        Axios.get(`/wine/get`)
    }

    return (
        <div className="container">
            <h2>Wine Log: {batch.wine.fancy_name}</h2>
            {render}
        </div>
    );
};
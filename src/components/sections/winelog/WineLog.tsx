import React, {FC, useEffect, useState} from 'react';
import {Wine} from '@server/database/entities/Wine'
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Fermentation} from '@entities/Fermentation';
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
    const [fermentations, setFerment] = useState<Fermentation[]>()

    const getBatchsFromBlend = async () => {
        // let batchs = await fetch()
        Axios.get(`/wine/get`)
    }

    // @ts-ignore
    let ferm = <FermentWlS batch={batch}/>;

    useEffect(() => {
        if (batch!.wine.wine_style === 'BLENDED') {

        } else {

        }
    }, [])

    return (
        <div className="container">
            <h2>Wine Log: {batch.wine.fancy_name}</h2>
            {batch!.wine.wine_style === 'BLENDED' ? (
                    <>
                        <h3>Blended</h3>

                    </>
                ) :
                ferm
            }
            {/*Batch Information*/}


            {/*Fermentation Updates*/}


            {/*Racking*/}
            <RackingWl/>


            {/*Filtering*/}
            <FilteringWl/>

            {/*Output*/}

        </div>
    );
};
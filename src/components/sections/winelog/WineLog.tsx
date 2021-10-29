import React, {FC, useEffect, useState} from 'react';
import {Wine} from '@server/database/entities/Wine'
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import {Redirect} from "react-router-dom";

interface Props {
    batch: Batch | Blended_Batch
}

export const WineLog: FC<Props> = ({batch}) => {
    const getBatchsFromBlend = async () => {
        // let batchs = await fetch()
    }

    return (
        <div className="container">
            <h2>Wine Log: {batch.wine.fancy_name}</h2>
            {batch!.wine.wine_style === 'BLENDED' && (
                <>
                    <h3>Blended</h3>

                </>
            )}
            {/*Batch Information*/}


            {/*Filtering Updates*/}

            {/*Racking*/}

            {/*Filtering*/}

            {/*Output*/}

        </div>
    );
};
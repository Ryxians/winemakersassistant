import React, {FC, useEffect, useState} from 'react';
import {Output} from '@entities/Output'
import {Batch} from '@entities/Batch'
import Axios from "axios";
import {OutputWLC} from "./OutputWLC";
import {OutputC} from "../../../manage/stage-components/OutputC";

interface Props {
    batch: Batch
}

export const OutputWLS : FC<Props> = ({batch}) => {
    // Filter objects to display
    const [outputs, setOut] = useState<Output[]>();

    // Grab outputs from the batch
    const getOuts = () => {
        Axios.get(`/wine/get/output/${batch.batch_id}`).then(res => {
            let outs: Output[] = res.data;

            outs.forEach(out => {
                // Fix Date
                out.date = new Date(out.date);
            });

            setOut(outs);
        })
    }

    // Sort and create components
    const outs = () => {
        // When creating components, they need a k
        // i will be the key
        let i = 0;
        if (outputs && outputs.length > 0) {
            const sorted = outputs.sort((a, b) => {
                return a.date.getTime() - b.date.getTime();
            });

            return sorted.map(out => {
                let rc = <OutputWLC key={i} output={out} />
                i++;
                return rc;
            });
        } else {
            return (
                <>
                    <h3>This Wine Hasn't Been Bottled Yet.</h3>
                </>
            )
        }
    }

    useEffect(() => {
        getOuts();
    }, []);

 return (
  <div>
      {outputs ? outs() : <h3>No Output Section</h3>}
  </div>
 );
};
import React, {FC, useEffect, useState} from 'react';
import {Output} from '@entities/Output'
import {Blended_Output} from '@entities/Blended_Output'
import {Batch} from '@entities/Batch'
import {Blended_Batch} from "@entities/Blended_Batch"
import Axios from "axios";
import {OutputWLC} from "./OutputWLC";
import {OutputC} from "../../../manage/stage-components/OutputC";

interface Props {
    batch: Batch | Blended_Batch
}

export const OutputWLS : FC<Props> = ({batch}) => {
    // Filter objects to display
    const [outputs, setOut] = useState<Output[] | Blended_Output[]>();

    // Grab outputs from the batch
    const getOuts = () => {
        let b = batch as Batch;
        let bb = batch as Blended_Batch;
        let get = '/wine/get/';
        get += b.batch_id ? `output/${b.batch_id}` : `blended_output/${bb.blend_id}`;
        Axios.get(get).then(res => {
            let outs: Output[] | Blended_Output[] = res.data;

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
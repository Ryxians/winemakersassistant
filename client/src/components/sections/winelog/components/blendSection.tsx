import React from "react";
import {Blended_Batch} from "@entities/Blended_Batch"

export const blendSection = (b: Blended_Batch) => {

    let date = new Date(b.date);
    let time = date.toLocaleString().split(',');

    const {tank, notes} = b;

    const getBlendToBatchRows = () => {
        let i = 0;
        return b.blend_to_batch.map(bb => {
            i++;
            return <tr key={i}>
                <td>{bb.batch.wine.fancy_name}</td>
                <td>{bb.gallons_used}</td>
                <td>Gallons Used</td>
            </tr>
        })
    }
    return (
        <>
            <table className="table table-sm table-striped table-bordered border-dark text-start">
                <tbody>
                <tr>
                    <td>Tank: {tank}</td>
                    <td>Date: {time[0]}</td>
                    <td></td>
                </tr>
                {getBlendToBatchRows()}
                <tr>
                    <td colSpan={3}>Notes: {notes}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

import React from "react";
import {Batch} from '@entities/Batch'

export const batchSection = (b: Batch) => {

    let date = new Date(b.start_date);
    let time = date.toLocaleString().split(',');
    return (
        <>
            <table className="table table-sm table-striped table-bordered border-dark text-start">
                <tbody>
                <tr>
                    <td>Tank: {b.starting_tank}</td>
                    <td>Date: {time[0]}</td>
                    <td>Wine Style: {b.wine.wine_style}</td>
                </tr>
                <tr>
                    <td># of Kits: {b.kit_amount}</td>
                    <td>Kit Volume: {b.wine.kit_volume}</td>
                    <td>Temperature: {b.temperature}</td>
                </tr>
                <tr>
                    <td>Volume Level: {b.volume}</td>
                    <td>Starting SG: {b.sg}</td>
                    <td>Brix Before Water Add: {b.brix}</td>
                </tr>
                <tr>
                    <td colSpan={3}>Notes: {b.notes}</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

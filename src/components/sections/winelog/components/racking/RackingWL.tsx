import React, {FC, useEffect, useState} from 'react';
import Axios from "axios";
import {Racking} from '@entities/Racking';
import {Batch} from '@entities/Batch'

interface Props {
    batch: Batch
}

export const RackingWl: FC<Props> = ({batch}) => {
    return (
        <>
            <h3>Racking</h3>
            <table className="table table-striped table-bordered border-dark text-start">
                <tbody>
                <tr>
                    <td>Date: </td>
                    <td>SG: </td>
                    <td>Temperature: </td>
                </tr>
                <tr>
                    <td>Sulfite: </td>
                    <td>Sorbate: </td>
                    <td>Kieselsol: </td>
                </tr>
                <tr>
                    <td>Isinglass: </td>
                    <td>SG Factor: </td>
                    <td>Vol. level</td>
                </tr>
                <tr>
                    <td>ALC Test: </td>
                    <td>ALC %: </td>
                    <td>ALC Test Date: </td>
                </tr>
                <tr>
                    <td>Tank #: </td>
                    <td colSpan={2}>Notes: </td>
                </tr>
                </tbody>
            </table>

        </>
    );
};
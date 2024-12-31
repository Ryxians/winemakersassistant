import React, {FC} from 'react';
import {Racking} from '@entities/Racking';

interface Props {
    racking: Racking
    number?: number
}

export const RackingWLC : FC<Props> = ({racking}) => {
    const {date, sg, temperature, sulfite, sorbate, kieselsol,
        isinglass, sgFactor, volume, alc, new_tank
    } = racking;
    let time = date.toLocaleString().split(",");
 return (
     <>
         <h3>Racking</h3>
         <table className="table table-sm table-striped table-bordered border-dark text-start">
             <tbody>
             <tr>
                 <td>Date: {time[0]}</td>
                 <td>SG: {sg}</td>
                 <td>Temperature: {temperature}</td>
             </tr>
             <tr>
                 <td>Sulfite: {sulfite}</td>
                 <td>Sorbate: {sorbate}</td>
                 <td>Kieselsol: {kieselsol}</td>
             </tr>
             <tr>
                 <td>Isinglass: {isinglass}</td>
                 <td>SG Factor: {sgFactor}</td>
                 <td>Vol. level: {volume}</td>
             </tr>
             <tr>
                 <td>ALC Test: {sg}</td>
                 <td>ALC %: {alc}</td>
                 <td></td>
             </tr>
             <tr>
                 <td>Tank #: {new_tank}</td>
                 <td colSpan={2}>Notes: </td>
             </tr>
             </tbody>
         </table>

     </>

 );
};
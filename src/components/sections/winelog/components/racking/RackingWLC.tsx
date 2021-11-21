import React, {FC} from 'react';
import {Racking} from '@entities/Racking';

interface Props {
    racking: Racking
    number?: number
}

export const RackingWLC : FC<Props> = ({racking}) => {
    const {date, sg, temperature, sulfite, sorbate, kieselsol} = racking;
    let time = date.toLocaleString().split(",");
 return (
     <>
         <h3>Racking</h3>
         <table className="table table-striped table-bordered border-dark text-start">
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
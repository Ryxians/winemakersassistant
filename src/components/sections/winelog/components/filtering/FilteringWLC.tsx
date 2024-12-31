import React, {FC} from 'react';
import {Filtering} from '@entities/Filtering'

interface Props {
    filtering: Filtering
    number?: number
}

export const FilteringWLC : FC<Props> = ({filtering}) => {
    const {date, new_tank, notes, vol, filterMedium} = filtering;

    // Break time into a date and time
    let time = date.toLocaleString().split(",");
 return (
  <>
   <h3>Filtering</h3>
      <table className="table table-sm table-striped table-bordered border-dark text-start">
          <tbody>
          <tr>
              <td>Date: {time[0]}</td>
              <td>Vol. Level: {vol}</td>
              <td>Filter Media: {filterMedium}</td>
          </tr>
          <tr>
              <td>Tank #: {new_tank}</td>
              <td colSpan={2}>Notes: {notes}</td>
          </tr>
          </tbody>
      </table>
  </>
 );
};
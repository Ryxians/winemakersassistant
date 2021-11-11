import React, {FC} from 'react';
import {Fermentation} from '@entities/Fermentation';

interface Props {
    ferment: Fermentation
    number: number
}

export const FermentWLC : FC<Props> = ({ferment, number}) => {
    const { fermentation_date, sg, temperature, notes } = ferment;
    let fixed_date = new Date(fermentation_date);
 return (
  <tr>
      <td>{number}</td>
      <td>{fixed_date.getDay() + "-" + fixed_date.getMonth() + "-" + fixed_date.getFullYear()}</td>
      <td>{fixed_date.getHours() + ":" + fixed_date.getMinutes()}</td>
      <td>{sg}</td>
      <td>{temperature}</td>
      <td>{notes}</td>
  </tr>
 );
};
import React, {FC} from 'react';
import {Fermentation} from '@entities/Fermentation';
import {FermentationC} from "../../../continue/stage-components/FermentationC";
import { Batch } from '@entities/Batch'

interface Props {
    ferment: Fermentation
    number: number
    batch: Batch
}

export const FermentWLC : FC<Props> = ({batch, ferment, number}) => {
    const { date, sg, temperature, notes } = ferment;
    let fixed_date = new Date(date);
 return (
  <tr>
      <td>{number}</td>
      <td>{fixed_date.getDay() + "-" + fixed_date.getMonth() + "-" + fixed_date.getFullYear()}</td>
      <td>{fixed_date.getHours() + ":" + fixed_date.getMinutes()}</td>
      <td>{sg}</td>
      <td>{temperature}</td>
      <td>{notes}</td>
      <td className="d-print-none"><FermentationC batch={batch} ferm={ferment} name={"Edit " + number}/></td>
  </tr>
 );
};
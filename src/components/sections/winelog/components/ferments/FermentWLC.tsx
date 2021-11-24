import React, {FC} from 'react';
import {Fermentation} from '@entities/Fermentation';
import {FermentationC} from "../../../manage/stage-components/FermentationC";
import { Batch } from '@entities/Batch'

interface Props {
    ferment: Fermentation
    number: number
    batch: Batch
}

export const FermentWLC : FC<Props> = ({batch, ferment, number}) => {
    const { date, sg, temperature, notes } = ferment;
    let time = date.toLocaleString().split(",");

 return (
  <tr>
      <td>{number}</td>
      <td>{time[0]}</td>
      <td>{time[1]}</td>
      <td>{sg}</td>
      <td>{temperature}</td>
      <td>{notes}</td>
      <td className="d-print-none"><FermentationC batch={batch} ferm={ferment} name={"Edit " + number}/></td>
  </tr>
 );
};
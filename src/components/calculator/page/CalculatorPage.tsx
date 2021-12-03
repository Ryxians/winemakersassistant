import React, {FC} from 'react';
import {CardGroup} from "react-bootstrap";
import {ALCTestCard} from "../alctest/ALCTestCard";
import {VolumeCard} from "../volume/VolumeCard";

interface Props {

}

export const CalculatorPage : FC<Props> = () => {
 return (
  <div className={"container align-content-center"}>
      <h3>Calculators</h3>
      <CardGroup className={"container g-4"} style={{width: '70%'}}>
          <ALCTestCard/>
          <VolumeCard />
      </CardGroup>

  </div>
 );
};
import React, {FC} from 'react';
import {Button, Card, CardGroup, Dropdown, ListGroup, ListGroupItem} from "react-bootstrap";
import {AlcoholTest} from "../alctest/AlcoholTest";
import percent from "./percent.svg"
import {PortCalculator} from "../alctest/PortCalculator";
import {ALCTestCard} from "../alctest/ALCTestCard";

interface Props {

}

export const CalculatorPage : FC<Props> = () => {
 return (
  <div className={"container align-content-center"}>
      <h3>Calculators</h3>
      <CardGroup className={"container g-4"}>
          <ALCTestCard/>
      </CardGroup>

  </div>
 );
};
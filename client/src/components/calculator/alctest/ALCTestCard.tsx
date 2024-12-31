import React, {FC} from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import percent from "./percent.svg";
import {AlcoholTest} from "./AlcoholTest";
import {PortCalculator} from "./PortCalculator";

interface Props {

}

export const ALCTestCard : FC<Props> = () => {
 return (
     <Card border={"primary"} style={{ width: '18rem' }}>
         <Card.Header>ALC Test</Card.Header>
         <Card.Img variant="top" src={percent} />
         <Card.Body>
             <Card.Text>
                 Calculate the wine's Alcohol Percentage.
             </Card.Text>

         </Card.Body>
         <ListGroup className={"list-group-flush"}>
             <ListGroupItem><AlcoholTest /></ListGroupItem>
             <ListGroupItem><PortCalculator /></ListGroupItem>

         </ListGroup>
     </Card>
 );
};
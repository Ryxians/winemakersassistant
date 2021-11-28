import React, {FC} from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import liquid from "./liquid-svgrepo-com.svg"
import {ElevenHundredLiter} from "./ElevenHundredLiter";
import {FiveHundredFiftyLiter} from "./FiveHundredFiftyLiter";
import {FiftyGallon} from "./FiftyGallon";

interface Props {

}

export const VolumeCard : FC<Props> = () => {
 return (
     <Card border={"primary"} style={{ width: '18rem' }}>
         <Card.Header>Volume Calculators</Card.Header>
         <Card.Img variant="top" src={liquid} />
         <Card.Body>
             <Card.Text>
                 Calculate the volume of the tank.
             </Card.Text>

         </Card.Body>
         <ListGroup className={"list-group-flush"}>
             <ListGroupItem><ElevenHundredLiter /></ListGroupItem>
             <ListGroupItem><FiveHundredFiftyLiter /></ListGroupItem>
             <ListGroupItem><FiftyGallon /></ListGroupItem>
         </ListGroup>
     </Card>
 );
};
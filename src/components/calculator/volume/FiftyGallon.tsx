import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";

interface Props {

}

interface Inputs {
    kits:number
}

export const FiftyGallon : FC<Props> = () => {
    const {handleSubmit, register} = useForm<Inputs>();

    // Modal Settings
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Tank Calculations
    const [tankVolume, setTankVolume] = useState(0);
    const [fillHeight, setFill] = useState(0);
    const [level, setLevel] = useState(0);

    const calc = ({kits}:Inputs) => {
        setTankVolume(kits*23);
        setFill(tankVolume/21.08);
        setLevel((tankVolume*0.264172052)/1.2);
    }
 return (
     <>
         <Button variant="primary" onClick={handleShow}>
             50G Tank
         </Button>

         <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
                 <Modal.Title>50 Gal Tank</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <Form onSubmit={handleSubmit(calc)}>
                     <InputGroup>
                         <InputGroup.Text># Of Kits</InputGroup.Text>
                         <Form.Control type={"number"} {...register("kits")}></Form.Control>
                         <InputGroup.Text>Max is 8</InputGroup.Text>
                     </InputGroup>

                     <Button variant="primary" type={"submit"}>
                         Calculate
                     </Button>

                     <Form.Group>
                         <Form.Label>Tank Volume:</Form.Label>
                         <Form.Label className={"px-1"}>{tankVolume}</Form.Label>
                         <Form.Label className={"fw-bold"}>Liters</Form.Label>
                     </Form.Group>
                     <Form.Group>
                         <Form.Label>Fill Height: </Form.Label>
                         <Form.Label className={"px-1"}>{level}</Form.Label>
                         <Form.Label className={"fw-bold"}>Inches</Form.Label>
                     </Form.Group>
                 </Form>

             </Modal.Body>
             <Modal.Footer>
                 <Button variant="secondary" onClick={handleClose}>
                     Close
                 </Button>
             </Modal.Footer>
         </Modal>
     </>

 );
};
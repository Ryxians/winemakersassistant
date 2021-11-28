import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";

interface Props {

}

interface Inputs {
    kits:number
    kitsS:number
    addpack:number
}

export const FiveHundredFiftyLiter : FC<Props> = () => {
    const {handleSubmit, register} = useForm<Inputs>();

    // Modal Settings
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Tank Calculations
    const [tankVolume, setTankVolume] = useState(0);
    const [fillVol, setFillVol] = useState(0);

    const calc = ({kits}:Inputs) => {
        setTankVolume(kits*23);
        console.log("Number of kits: ", kits)
    }

    const calcFr = ({kitsS, addpack}:Inputs) => {
        setFillVol((23-addpack)*kitsS);
    }

 return (
     <>
         <Button variant="primary" onClick={handleShow}>
             550L Tank
         </Button>

         <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
                 <Modal.Title>550L Tank</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <Form onSubmit={handleSubmit(calc)}>
                     <h6 className={"fw-bold"}>Red/White</h6>
                     <InputGroup>
                         <InputGroup.Text># Of Kits</InputGroup.Text>
                         <Form.Control type={"number"} {...register("kits")}></Form.Control>
                         <InputGroup.Text>Max is 25</InputGroup.Text>
                     </InputGroup>

                     <Button variant="primary" type={"submit"}>
                         Calculate
                     </Button>

                     <Form.Group>
                         <Form.Label>Tank Volume:</Form.Label>
                         <Form.Label className={"px-1"}>{tankVolume}</Form.Label>
                         <Form.Label className={"fw-bold"}>Liters</Form.Label>
                     </Form.Group>
                 </Form>

                 <Form onSubmit={handleSubmit(calcFr)}>
                     <h6>Fruits</h6>

                     <InputGroup>
                         <InputGroup.Text># Of Kits</InputGroup.Text>
                         <Form.Control type={"number"} {...register("kitsS")}></Form.Control>
                         <InputGroup.Text>Max is 26</InputGroup.Text>
                     </InputGroup>
                     <InputGroup>
                         <InputGroup.Text>Addpack Volume</InputGroup.Text>
                         <input className={"form-control"} type={"number"} step={.001} {...register("addpack")}/>
                         <InputGroup.Text>Liters</InputGroup.Text>
                     </InputGroup>

                     <Button variant="primary" type={"submit"}>
                         Calculate
                     </Button>

                     <Form.Group>
                         <Form.Label>Fill Volume:</Form.Label>
                         <Form.Label className={"px-1"}>{fillVol}</Form.Label>
                         <Form.Label className={"fw-bold"}>Liters W/O Addpacks!</Form.Label>
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
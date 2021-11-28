import React, {FC, useState} from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";

interface Props {

}

interface Inputs {
    kits:number
}

export const ElevenHundredLiter: FC<Props> = () => {
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
        setLevel(level-2);
        console.log(kits)
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                1100L Tank
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>1100L Tank</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(calc)}>
                        <InputGroup>
                            <InputGroup.Text># Of Kits</InputGroup.Text>
                            <Form.Control type={"number"} {...register("kits")}></Form.Control>
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
                            <Form.Label>Tank Fill Height: </Form.Label>
                            <Form.Label className={"px-1"}>{fillHeight}</Form.Label>
                            <Form.Label style={{fontSize: '.5em'}} className={"fw-bold text-wrap text-center"} >Max is 50 Inches (From the bottom edge of tank, add 2in for the volume in the base)</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Level Guage Height: </Form.Label>
                            <Form.Label className={"px-1"}>{level}</Form.Label>
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
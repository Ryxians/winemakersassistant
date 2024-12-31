import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {Batch} from '@entities/Batch'
import {Blended_Batch} from '@entities/Blended_Batch'
import {User} from '@entities/User'
import Axios from "axios";
import {InputRequiredAlert} from "../../InputRequiredAlert";

interface Props {
    batch: Batch | Blended_Batch
    user: User
}

interface Output {
    date: Date,
    batch_id: number
    blend_id: number
    numberOfContainer: number
    containerSize: number
    notes: string
    fillLevel: number
    fillLevelTwo: number
    user_id: number
}

export const OutputC: FC<Props> = ({batch, user}) => {
    const {handleSubmit, register, setValue, formState: {errors}} = useForm<Output>(
        {defaultValues: {
            containerSize: 750,
                fillLevel: 0,
                fillLevelTwo: 0
        }});

    // Modal Settings
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (out: Output) => {
        let b = batch as Batch;
        let bb = batch as Blended_Batch;
        let path = '';
        if (b.batch_id) {
            out.batch_id = b.batch_id;
            path = 'output'
        }
        if (bb.blend_id) {
            out.blend_id = bb.blend_id;
            path = 'blended_output';
        }
        out.user_id = user.id;
        Axios.post(`/wine/add/${path}`, out).then(res => {
            if (res.status === 201 || res.status === 200) {
                handleClose();
            } else {
                console.log(':(')
            }
        });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Bottle
            </Button>

            <Modal show={show}
                   onHide={handleClose} centered
                   size={"lg"}
                   fullscreen={"md-down"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bottling/Output</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <InputGroup>
                            <InputGroup.Text>Bottling Date: </InputGroup.Text>
                            <input type={"datetime-local"}
                                   className={"form-control"}
                                   {...register("date", {required: true})}
                            />
                        </InputGroup>
                        {errors.date && <InputRequiredAlert>Date Required</InputRequiredAlert>}

                        <InputGroup >
                            <InputGroup.Text>Fill Level: </InputGroup.Text>
                            <Form.Control type={"number"} {...register("fillLevel")}/>

                            <InputGroup.Text>Fill Level 2: </InputGroup.Text>
                            <Form.Control type={"number"} {...register("fillLevelTwo")}/>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>Default Containers</InputGroup.Text>
                            <Form.Control as={"select"}
                                          onChange={(evt) => {
                                              let target = evt.target
                                              let num = parseInt(target.value);
                                              setValue("containerSize", num);
                                          }}>
                                <option value={750}>750ml Bottle</option>
                                <option value={500}>500ml Bottle</option>
                                <option value={375}>375ml Bottle</option>
                                <option value={18927.1}>5G Keg</option>

                            </Form.Control>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>How many bottled: </InputGroup.Text>
                            <Form.Control type={"number"}
                                          {...register("numberOfContainer",
                                              {required: true})} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>Container Size</InputGroup.Text>
                            <Form.Control type={"number"}
                                          {...register("containerSize",
                                              {required: true})}
                            />
                        </InputGroup>

                        {(errors.numberOfContainer || errors.containerSize) &&
                        <InputRequiredAlert>
                            {errors.numberOfContainer && "Number "} {errors.containerSize && "Size "} Required
                        </InputRequiredAlert>}

                        <InputGroup>
                            <InputGroup.Text>Notes: </InputGroup.Text>
                            <Form.Control as={"textarea"}
                                          {...register("notes")}
                            />
                        </InputGroup>

                        <Button type={"submit"}>Submit</Button>

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
}
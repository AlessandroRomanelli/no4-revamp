import React, {useState} from "react";
import "./index.sass"

import NationOption from "./nations";

import { Button, Modal, Form } from "react-bootstrap"

export default function ApplicationForm() {
    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return <a href={"https://docs.google.com/forms/d/e/1FAIpQLSdAMOApJEhmTQcAlbSisXxxYgUhoFptmRB36dpxmefXGTNNAA/viewform"}  rel="noopener noreferrer" target={"_blank"}>
        <Button className={"application-btn"}>Apply for membership</Button>
    </a>
    /*
    return <>

        <Button className={"application-btn"} onClick={openModal}>Apply for membership</Button>

        <Modal id={"application-modal"} show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Member Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <small>
                    <strong>DISCLAIMER</strong>: Lying or intentionally providing false information about yourself will cause your immediate
                    removal from the unit, irregardless of member's rights to have fair warnings.
                </small>
                <hr/>
                <Form>
                    <div className={"desired-name"}>
                        <Form.Label>Desired Name:</Form.Label>
                        <div className={"input"}>
                            <Form.Group controlId="formDesiredInitial">
                                <Form.Control maxlength={1} type="initial" placeholder="" />
                            </Form.Group>
                            <span>.</span>
                            <Form.Group controlId="formDesiredName">
                                <Form.Control type="initial" placeholder="" />
                            </Form.Group>
                        </div>
                        <Form.Text className="text-muted">
                            We would like you to choose a <strong>realistic name</strong> to use within the unit, it
                            <strong>must</strong> be in the following format: "W. White", with the first name letter
                            capitalised, a point, a white-space and the chosen last name.
                        </Form.Text>
                    </div>
                    <hr/>
                    <Form.Group controlId="formAge">
                        <Form.Label>Date of birth:</Form.Label>
                        <Form.Control type="date" placeholder="Enter your age"/>
                    </Form.Group>
                    <hr/>
                    <div className={"nationality"}>
                        <Form.Group controlId="formAge">
                            <Form.Label>Where are you from?</Form.Label>
                            <Form.Control as="select" custom>
                                <NationOption/>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Our unit is composed of people from all over the world, let us know where you come from!
                            </Form.Text>
                        </Form.Group>
                    </div>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={closeModal}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
    */
}
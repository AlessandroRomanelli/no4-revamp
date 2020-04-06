import React, {useState} from "react";
import axios from "axios";
import {Button, Form, Modal} from "react-bootstrap";
import {getLoggedUser, login} from "../../utils";
import {useDispatch} from "react-redux";

export default function Registration({ failed, setShow, setFailed, setMode }) {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    const handleError = (form, err) => {
        form.email.setCustomValidity("");
        switch (err.extensions.exception.code) {
            case 11000:
                form.email.setCustomValidity("Email already taken");
                break;

        }
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;

        let invalid = form.checkValidity === false;

        form.password.setCustomValidity((invalid |= form.password.value.length < 8) ? "Password must be 8+ characters long" : "");

        form.confirmPassword.setCustomValidity((invalid |= form.password.value !== form.confirmPassword.value) ? "The two passwords must match" : "");

        setValidated(true);

        if (invalid) {
            e.preventDefault();
            e.stopPropagation();
            setFailed(true);
            setTimeout(() => setFailed(false), 2000);
            return;
        }

        const { data } = await axios.post("http://localhost:3000/api", {
            query: `
                mutation ($email: String, $password: String) {
                  createUser(data: {email: $email, password: $password}) {
                    id
                  }
                } 
            `,
            variables: {
                email: form.email.value,
                password: form.password.value
            }
        });
        if (data.errors && data.errors.length > 0) {
            data.errors.forEach(err => handleError(form, err));
            return;
        }

        const user = await getLoggedUser(await login(form.email.value, form.password.value));
        dispatch({
            type: "store_user",
            payload: user
        })

    };

    return <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header>
            Signup
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Email" required />
                <Form.Control.Feedback type={"invalid"}>Email is already in use</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
                <Form.Control.Feedback type={"invalid"}>Password must be 8+ characters long</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" required />
                <Form.Control.Feedback type={"invalid"}>The two passwords must match</Form.Control.Feedback>
            </Form.Group>
            <Form.Text className="text-muted">
                Already have an account? <a href={"#"} onClick={() => setMode("login")}>Log in!</a>
            </Form.Text>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={"secondary"} onClick={() => setShow(false)}>Close</Button>
            <Button variant="primary" type="submit" disabled={failed}>
                Register
            </Button>
        </Modal.Footer>
    </Form>
}
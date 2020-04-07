import React, {useState} from "react";
import Swal from "sweetalert2";
import {Button, Form, Modal} from "react-bootstrap";
import {getLoggedUser, login, sendGraphQLRequest} from "../../utils";
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
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        let invalid = form.checkValidity === false;

        form.password.setCustomValidity((invalid |= form.password.value.length < 8) ? "Password must be 8+ characters long" : "");

        const sameEmail = (form.email.value === form.confirmEmail.value);
        form.confirmEmail.setCustomValidity(!sameEmail ? "The two emails must match" : "");
        invalid |= !sameEmail;

        form.confirmPassword.setCustomValidity((form.password.value !== form.confirmPassword.value) ? "The two passwords must match" : "");
        invalid |= form.password.value !== form.confirmPassword.value;

        setValidated(true);

        if (invalid) {
            setFailed(true);
            setTimeout(() => setFailed(false), 2000);
            return;
        }

        const query = `
            mutation ($email: String, $password: String) {
              createUser(data: {email: $email, password: $password}) {
                id
              }
            } 
        `;

        const variables = {
            email: form.email.value,
            password: form.password.value
        };

        try {
            const { data } = await sendGraphQLRequest(query, variables);
            if (data.errors && data.errors.length > 0) {
                e.preventDefault();
                e.stopPropagation();
                data.errors.forEach(err => handleError(form, err));
                return;
            }
        } catch (e) {
            console.error(e.response ? e.response : e);
        }

        const user = await getLoggedUser(await login(form.email.value, form.password.value));
        dispatch({
            type: "store_user",
            payload: user
        });
        await Swal.fire({
            icon: 'success',
            title: 'Signed up!',
            text: "Congratulations, feel free to submit an application now!",
            timer: 2000,
            timerProgressBar: true
        });
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

            <Form.Group controlId="confirmEmail">
                <Form.Label>Confirm Email:</Form.Label>
                <Form.Control type="email" placeholder="Confirm Email" required />
                <Form.Control.Feedback type={"invalid"}>The two emails must match</Form.Control.Feedback>
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
                Already have an account? <a href={"#"} onClick={(e) => {e.preventDefault(); setMode("login")}}>Log in!</a>
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
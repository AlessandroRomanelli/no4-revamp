import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {getLoggedUser, login} from "../../utils";
import {useDispatch} from "react-redux";
import Swal from "sweetalert2";

export default function Login({ failed, setShow, setFailed, setMode }) {
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setFailed(false);
    }, []);

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        const token = await login(form.email.value, form.password.value);

        if (!token) {
            setFailed(true);
            setTimeout(() => setFailed(false), 2500);
            return;
        }

        const user = await getLoggedUser(token);

        dispatch({
            type: "store_user",
            payload: user
        });
        dispatch({
            type: "store_token",
            payload: token
        });
        await Swal.fire({
            icon: 'success',
            title: 'Logged in!',
            text: Boolean(user.name) ? `Welcome back, ${user.name}` : 'Welcome back',
            timer: 2000,
            timerProgressBar: true
        });
        setShow(false);
    };

    return <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header>
            Login
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="email">
                <Form.Control type="email" placeholder="Email" required />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            {failed ? <div className={"feedback"}><small>Invalid login credentials</small></div> : <Form.Text className="text-muted">
                Don't have an account? <a href={"#"} onClick={(e) => {e.preventDefault(); setMode("register")}}>Sign up!</a>
            </Form.Text>}
        </Modal.Body>
        <Modal.Footer>
            <Button variant={"secondary"} onClick={() => setShow(false)}>Close</Button>
            <Button variant="primary" type="submit" disabled={failed}>
                Login
            </Button>
        </Modal.Footer>
    </Form>
}
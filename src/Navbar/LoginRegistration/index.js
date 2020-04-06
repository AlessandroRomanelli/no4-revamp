import React, {useState, createRef} from "react";
import {Modal} from "react-bootstrap";
import "./index.sass"

import Registration from "./register";
import Login from "./login";


export default function LoginRegistration({ initialMode }) {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(initialMode);
    const [failed, setFailed] = useState(false);

    const modal = createRef();

    const handleClick = e => {
        e.preventDefault();
        setShow(true);
    };

    return <>
        <a href={"#"} onClick={handleClick}>
            <span>Login</span>
        </a>
        <Modal dialogClassName={failed ? "shake" : null} ref={modal} size={"sm"} centered show={show} onHide={() => setShow(false)}>
            {mode === "login" ?
                <Login setShow={setShow} setFailed={setFailed} failed={failed} setMode={setMode}/> :
                <Registration setShow={setShow} setFailed={setFailed} failed={failed} setMode={setMode}/>
            }
        </Modal>
    </>;
}
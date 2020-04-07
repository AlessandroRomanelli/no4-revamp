import React, {useState} from "react";
import "./index.sass"

import Requirements from "./Requirements"
import Schedule from "./Schedule"

import RippedPaperTransition from "../../RippedPaperTransition"

import {Button, Modal} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Login from "../../Navbar/LoginRegistration/login";
import Registration from "../../Navbar/LoginRegistration/register";

export default function Join() {
    const store = useSelector(state => state);

    const JoinButton = () => {
        const [show, setShow] = useState(false);
        const [mode, setMode] = useState("register");
        const [failed, setFailed] = useState(false);

        const handleClick = (e) => {
            if (!store || !store.user) {
                e.preventDefault();
                e.stopPropagation();
                setShow(true);
            }
        };

        if (store && store.user && store.user.state !== "applicant") {
            return <Button disabled className={"application-btn submitted"}>Already a member</Button>
        };
        if (store && store.user && store.user.state === "applicant" && store.submitted) {
            return <Button disabled className={"application-btn submitted"}>Already applied</Button>
        };
        return <>
            <NavLink onClick={handleClick} to={"/application"}>
                <Button className={"application-btn"}>Apply for membership</Button>
            </NavLink>
            <Modal dialogClassName={failed ? "shake" : null} size={"sm"} centered show={show} onHide={() => setShow(false)}>
                {mode === "login" ?
                    <Login setShow={setShow} setFailed={setFailed} failed={failed} setMode={setMode}/> :
                    <Registration setShow={setShow} setFailed={setFailed} failed={failed} setMode={setMode}/>
                }
            </Modal>
        </>
    };

    return <div id={"join"} className={"my-container"}>
        <RippedPaperTransition type={0}/>
        <div className={"join"}>
            <div className={"highlight"}>
                <h1>Become a <span>commando</span>, today!</h1>
            </div>
            <p className={"description"}>
                Our unit is always looking to expand its members' pool by recruiting <strong>valuable</strong> and <strong>dedicated</strong> individuals.
            </p>
            <p className={"emphasis"}>Do you think you have what it takes to join our ranks?</p>
            <p className={"subtitle"}>
                (Before applying, please take a minute to make sure you're eligible by checking the following requirements)
            </p>
            <Requirements/>
            <Schedule/>
            <JoinButton/>
        </div>
        <RippedPaperTransition type={1} flipped={true}/>
    </div>;
}
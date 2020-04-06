import "./index.sass"
import React, {useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import { Textfit } from 'react-textfit';
import RippedPaperTransition from "../RippedPaperTransition";
import Form from "react-bootstrap/Form";
import NationOption from "./nations";
import {sendGraphQLRequest} from "../utils";
import Swal from "sweetalert2";


export default function Application() {
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    const [roleOptions, setRoleOptions] = useState([]);

    useEffect(() => {
        (async () => {
            const query = `query($userId: ID!) {
                allRoles {
                    id,
                    name
                }
            }`;
            if (!store) {
                console.error("No store found");
                return;
            }
            const {data} = await sendGraphQLRequest(query, { userId: store.user.id }, store.token);
            setRoleOptions(data.allRoles);
        })();
    }, [store]);

    const checkToRedirect = () => {
        return store.submitted || !(store && store.user && store.user.state === "applicant")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        const {desiredInitial, desiredName, steamId, dob, nation: country, role, attendance, interest, experience: hoursExp, referrer, rules} = e.currentTarget;
        const name = `${desiredInitial.value}. ${desiredName.value}`;
        const mutation = `
        mutation($name: String, $steamId: String, $userId: ID!, $dob: DateTime, $country: String, ${role.value !== "" ? "$role: ID!," : ""} $interest: String, $hoursExp: Int, $referrer: String, $rules: Boolean, $attendance: Boolean) {
            createApplication(data: { 
                user: { connect: { id: $userId }}, 
                name: $name, 
                steam: $steamId, 
                dob: $dob, 
                country: $country, 
                ${role.value !== "" ? `preferred_role: { connect: { id: $role } },` : ""}
                interest: $interest,
                hours_exp: $hoursExp,
                referred_from: $referrer,
                accept_attendance: $attendance,
                read_rules: $rules
            }) {
                id
            }   
        }`;
        const variables = {
            name,
            steamId,
            userId: store.user.id,
            dob,
            country,
            role,
            interest,
            hoursExp,
            referrer,
            rules,
            attendance
        };
        Object.keys(variables).forEach(k => {
            if (typeof variables[k] === "object") {
                if (variables[k].value === "") {
                    variables[k] = null;
                    return;
                }
                if (variables[k].type === "date") {
                    variables[k] = new Date(variables[k].value);
                    return;
                }
                if (variables[k].type === "checkbox") {
                    variables[k] = variables[k].checked;
                    return;
                }
                if (variables[k].type === "number") {
                    variables[k] = parseInt(variables[k].value)
                }
                variables[k] = variables[k].value
            }
        });
        try {
            await sendGraphQLRequest(mutation, variables, store.token);
            Swal.fire({
                title: 'Applied successfully!',
                html: "You'll soon be redirected!",
                timer: 2000,
                timerProgressBar: true,
            }).then(() => {
                dispatch({ type: "set_submitted" });
            })

        } catch (e) {
            console.error(e.response ? e.response : e);
        }
    };

    if (checkToRedirect()) {
        return <Redirect to={"/"}/>
    }

    return <div className={"application"}>

        <div className={"heading"}>
            <Textfit mode="single" max={150}>
                Membership Application
            </Textfit>
        </div>

        <div className={"my-container"}>
            <RippedPaperTransition type={0}/>
            <section>
                <div className={"my-disclaimer"}>
                    <strong>DISCLAIMER</strong>: Lying or intentionally providing false information about yourself will cause your immediate removal from the unit, irregardless of member's rights to have fair warnings.
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className={"desired-name"}>
                        <Form.Label>Desired Name:</Form.Label>
                        <div className={"input"}>
                            <Form.Group controlId="desiredInitial">
                                <Form.Control maxLength={1} type="text" placeholder=""/>
                            </Form.Group>
                            <span>.</span>
                            <Form.Group controlId="desiredName">
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
                    <Form.Group controlId={"steamId"}>
                        <Form.Label>Steam ID64:</Form.Label>
                        <Form.Control type={"text"}/>
                        <Form.Text className={"text-muted"}>
                            Don't know your ID? Visit <a href={"https://steamid.io/"} target={"_blank"}>steamid.io</a> and enter your profile link to find it!
                        </Form.Text>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId="dob">
                        <Form.Label>Date of birth:</Form.Label>
                        <Form.Control type="date" placeholder="Enter your age"/>
                    </Form.Group>
                    <hr/>
                    <div className={"nationality"}>
                        <Form.Group controlId="nation">
                            <Form.Label>Where are you from?</Form.Label>
                            <Form.Control as="select" custom>
                                <NationOption/>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Our unit is composed of people from all over the world, let us know where you come from!
                            </Form.Text>
                        </Form.Group>
                    </div>
                    <hr/>
                    <div className={"preferred-role"}>
                        <Form.Group controlId="role">
                            <Form.Label>Do you have a role preference already?</Form.Label>
                            <Form.Control as="select" custom>
                                <option value={""}>No preference</option>
                                {roleOptions.map((x, i) => <option key={i} value={x.id}>{x.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <hr/>
                    <Form.Group controlId="attendance">
                        <div className={"agreement"}>
                            <Form.Label>Attendance Requirement:</Form.Label>
                            <Form.Control type="checkbox"/>
                            <span>I agree</span>
                        </div>
                        <Form.Text className="text-muted">
                            Remember, although we do not have a set attendance requirement you should be able to commit yourself to
                            attending on a regular basis. Members should also be able to stay for the duration of any event they attend (usually 7:30pm - 10pm BST)
                        </Form.Text>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId="interest">
                        <Form.Label>Please explain why are you interested in joining this unit:</Form.Label>
                        <Form.Control as="textarea" rows={4} type="text"/>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId="experience">
                        <Form.Label>Give us an estimate of how many hours you have totaled in the ArmA series:</Form.Label>
                        <div className={"exp-hours"}>
                            <Form.Control min={0} type="number"/>
                            <span>hours</span>
                        </div>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId="referrer">
                        <Form.Label>How did you learn about us?</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <hr/>
                    <Form.Group controlId="rules">
                        <div className={"agreement"}>
                            <Form.Label>Have you read and accepted our rules:</Form.Label>
                            <Form.Control type="checkbox"/>
                            <span>I did</span>
                        </div>
                        <Form.Text className="text-muted">
                            Find the rules and regulations at the this <a href={"https://docs.google.com/document/d/1fapEk7Qus4UKMWOjl8n0SWtCKdjrU0Ow1YqY1zMM0uE/edit?usp=sharing"} target={"_blank"}>link</a> or in our <a href={"ts3://no4-commando.com?nickname=Web Guest"}>TS3 Server</a>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit application
                    </Button>
                </Form>
            </section>
        </div>


    </div>;
}
import React, {useEffect} from 'react';
import "./index.sass"
import LogoText from "../imgs/logo.png"
import { NavLink, Link } from "react-router-dom"
import Login from "./LoginRegistration"
import Logout from "./Logout"

import {getLoggedUser, sendGraphQLRequest} from "../utils";
import {useDispatch, useSelector} from "react-redux";

export default function MenuAppBar() {
    return (
        <div className={"my-navbar"}>
            <Logo/>
            <Navigation/>
        </div>
    );
}

function Logo() {
    return <div className={"logo"}>
        <img src={LogoText} alt={"no4 logo"}/>
    </div>
}


function Navigation() {
    const links = ["unit", "structure"];

    const store = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (store && store.user) return;
        (async () => {
            const token = localStorage.getItem("token");
            const user = await getLoggedUser(token);
            dispatch({ type: "store_user", payload: user});
            dispatch({ type: "store_token", payload: token});
        })()
    }, []);

    useEffect(() => {
        if (!store || !store.user) return;
        (async () => {
            const query = `
            query($userId: ID!) {
                allApplications(where: { user: { id: $userId }}) {
                    id
                }
            }
            `;
            const variables = {
                userId: store.user.id
            };
            try {
                const { data } = await sendGraphQLRequest(query, variables, store.token);
                if (data.allApplications.length > 0) {
                    dispatch({ type: "set_submitted" });
                }
            } catch (e) {
                console.error(e.response ? e.response : e);
            }
        })()
    }, []);

    return <div className={"navigation"}>
        <div className={"nav-container"}>
            <NavLink exact to={"/"}><span>Home</span></NavLink>
            {
                links.map((x,i) => <NavLink
                    key={i}
                    to={`/${x}`}
                >
                    <span>{x}</span>
                </NavLink>)
            }
            <a href={"https://paypal.me/no4commandoA3?locale.x=en_GB"} target={"_blank"}>donations</a>
        </div>
        <div className={"nav-container"}>
            {store && store.user ? <Logout/> : <Login initialMode={"login"}/>}
        </div>
        {store && store.user && store.user.state === "applicant" && <div className={["apply-now", store && store.submitted ? "submitted" : null].join(" ")}>
            {store && store.submitted ? "You applied!" : <Link to={"/application"}>Apply now!</Link>}
        </div>}
    </div>
}

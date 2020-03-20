import React from 'react';
import "./index.sass"
import LogoText from "../imgs/logo.png"
import { NavLink } from "react-router-dom"

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

    const links = ["unit", "structure", "donations"];

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
        </div>
        <div className={"nav-container"}>
            <a href={"https://docs.google.com/forms/d/e/1FAIpQLSdAMOApJEhmTQcAlbSisXxxYgUhoFptmRB36dpxmefXGTNNAA/viewform"} target={"_blank"}><span>Join</span></a>
        </div>

    </div>
}

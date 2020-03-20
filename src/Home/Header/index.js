import LogoImg from "../../imgs/hyde_logo.png";
import React from "react";

export default function Header() {
    return (
        <div id={"header"} className={"header"}>
            <div className={"title"}>
                <img src={LogoImg} alt={"no4 logo"}/>
                <span className={"subtitle"}>World War 2 Realism Unit</span>
            </div>
        </div>
    )
}

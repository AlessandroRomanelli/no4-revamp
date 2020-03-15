import React from "react";
import "./index.sass"

import Requirements from "./Requirements"
import Schedule from "./Schedule"

import RippedPaperTransition from "../../RippedPaperTransition"

export default function Join() {
    return <div className={"container"}>
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
        </div>
        <RippedPaperTransition type={1} flipped={true}/>
    </div>;
}
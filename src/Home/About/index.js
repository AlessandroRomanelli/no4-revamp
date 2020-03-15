import React from "react";
import "./index.sass"

import Trailer from "./Trailer"
import RippedPaperTransition from "../../RippedPaperTransition"

export default function About() {
    return <div className={"container"}>
        <RippedPaperTransition type={0}/>
        <div className={"about"}>
            <div className={"highlight"}>
                <h1>Unique</h1>
                <span className={"spacer"}/>
                <h1>Immersive</h1>
                <span className={"spacer"}/>
                <h1>Exciting</h1>
            </div>
            <p className={"description"}>
                When joining <strong>No.4 Commando</strong> you'll be guaranteed a <strong>unique, immersive and exciting experience</strong>.
                Fight the Axis powers and save the free world using the historical gear, weapons and vehicles of the WW2 Era.
                Gun down entire enemy squads behind your Bren gun, or sneak up on an enemy patrol with your SMG, jump out of a plane behind enemy lines or participate in a large scale beach landing.
            </p>
            <hr/>
            <Trailer/>
            <hr/>
        </div>
        <RippedPaperTransition type={1} flipped={true}/>
    </div>;
}
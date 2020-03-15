import React from "react";

import Paper1 from "./ripped_paper2.png"
import Paper2 from "./ripped_paper1.png"

const papers = [Paper1, Paper2];



export default function RippedPaperTransition({ type, flipped }) {
    if (type >= papers.length) {
        return null;
    }
    return <div className={["ripper", flipped ? "flipped" : null].join(" ")}>
        <img src={papers[type]} alt={"ripped paper"}/>
    </div>
}
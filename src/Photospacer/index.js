import React from "react";
import "./index.sass"

export default function Photospacer({ img, alt }) {
    return <div className={"photo-spacer"}>
        <img src={img} alt={alt}/>
    </div>;
}
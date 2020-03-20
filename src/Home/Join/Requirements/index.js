import React from "react"

import "./index.sass"
import Icon18 from "./18-icon.png"
import IconCalendar from "./attendance.png"
import IconExclusive from "./exclusive.png"

function Requirement({ title, icon, desc }) {
    return <div className={"item"}>
        <h2>{title}</h2>
        <img src={icon} alt={"icon requirement"}/>
        <p>{desc}</p>
    </div>
}

export default function Requirements() {
    return <div className={"requirements"}>
        <Requirement title={"Minimum Age"} icon={Icon18} desc={"You must be at least 18 years old, anyone younger will undergo a probation period"}/>
        <div className={"separator"}/>
        <Requirement title={"Attendance"} icon={IconCalendar} desc={"You should be able to guarantee your dedication to the unit by attending regularly to our operations"}/>
        <div className={"separator"}/>
        <Requirement title={"Professionalism"} icon={IconExclusive} desc={"We expect you to conduct yourself in respectful manner at all times whilst representing our unit"}/>
    </div>;
}
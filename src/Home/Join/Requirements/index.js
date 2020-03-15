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
        <Requirement title={"Minimum Age"} icon={Icon18} desc={"You must be at least 18 years old, anyone younger will undergo a probation period of a few weeks time"}/>
        <div className={"separator"}/>
        <Requirement title={"Attendance"} icon={IconCalendar} desc={"You should be able to guarantee your presence for at least two operations per week in a normal situation"}/>
        <div className={"separator"}/>
        <Requirement title={"Exclusivity"} icon={IconExclusive} desc={"We do not allow you to be a member of other units whilst being a commando and attending our operations"}/>
    </div>;
}
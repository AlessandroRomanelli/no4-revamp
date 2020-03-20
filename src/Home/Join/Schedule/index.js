import React, {useEffect} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import Countdown from 'react-countdown-now';



function Day({ day, idx }) {
    const mainDay = "Saturday";
    const sideOps = ["Wednesday"];
    return <div className={["day", day === mainDay ? "main" : null, sideOps.includes(day) ? "side" : null].join(" ")}>
        { idx === 0 && <span className={"today"}>Today</span>}
        { idx === 1 && <span className={"today"}>Tomorrow</span>}
        {day}
    </div>
}

function Time({ hour }) {
    return <div className={"time start"}>
        {hour}
    </div>
}


function TimeLeft({ total, days, hours, minutes, seconds, milliseconds, completed }) {
    return !completed ? <span className={"time-left"}>
        <span>{days} day{(days === 0 || days > 1) && "s"},</span>
        <span>{hours} hour{(hours === 0 || hours > 1) && "s"} and</span>
        <span>{minutes} minute{(minutes === 0 || minutes > 1) && "s"}</span>
    </span> : <span>Now!</span>;
}

const opDays = [3,6];

function getNextEvent() {
    const today = new Date();
    const nextEvent = new Date();
    const countToday = today.getUTCHours() <= 19 && today.getUTCMinutes() <= 30;
    const daysLeft = opDays.map(x => x - today.getDay()).find(x => x >= (countToday ? 0 : 1));
    nextEvent.setDate(today.getDate() + daysLeft);
    nextEvent.setUTCHours(19, 30);
    return nextEvent
}

export default function Schedule() {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; ++i) {
        week.push(weekdays[(today.getDay()+i) % 7]);
    }

    return <div className={"schedule"}>
        <h1>Our Schedule</h1>
        <div className={"week"}>
            {week.map((x,i) => <Day day={x} idx={i} key={i}/>)}
        </div>
        <div className={"countdown"}>
            Time left to next operation: {<Countdown date={getNextEvent()} renderer={TimeLeft}/> }
        </div>
        <h1>Operation Times</h1>
        <div className={"times"}>
            <Time hour={"19:30"}/>
            <div className={"separator"}>
                <FontAwesomeIcon icon={faLongArrowAltRight} color={"#b40f0f"} size={"lg"}/>
            </div>
            <Time hour={"22:00"}/>
        </div>
        <span className={"disclaimer"}>All times displayed are expressed in current British Time</span>

    </div>;
}
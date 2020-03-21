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
        {days > 0 && <span>{days} day{(days === 0 || days > 1) && "s"},</span>}
        {hours > 0 && <span>{hours} hour{(hours === 0 || hours > 1) && "s"} and</span>}
        <span>{minutes} minute{(minutes === 0 || minutes > 1) && "s"}</span>
    </span> : <span>Now!</span>;
}

const opDays = [3,6];

function getNextEvent() {
    const today = new Date();
    const nextEvent = new Date();
    const countToday = today.getUTCHours() < 19 || (today.getUTCHours() === 19 && today.getUTCMinutes() <= 30);
    const daysLeft = opDays.map(x => x - today.getDay()).find(x => x >= (countToday ? 0 : 1));
    console.log(countToday);
    console.log(daysLeft);
    nextEvent.setDate(today.getDate() + daysLeft);
    nextEvent.setUTCHours(19, 30);
    console.log(nextEvent);
    return nextEvent
}

function isOperationOngoing() {
    const today = new Date();
    return opDays.includes(today.getDay()) && ((today.getUTCHours() === 19 && today.getUTCMinutes() >= 30)  || (today.getUTCHours() > 20 && today.getUTCHours() <= 22))
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
            <span>Time left to next operation: {<Countdown date={getNextEvent()} renderer={TimeLeft}/>}</span>
            { isOperationOngoing() && <span className={"ongoing"}>An operation is currently taking place!</span> }
        </div>
        <div className={"details"}>
            <div className={"op-hours"}>
                <h1>When do we play</h1>
                <div className={"times"}>
                    <Time hour={"19:30"}/>
                    <div className={"separator"}>
                        <FontAwesomeIcon icon={faLongArrowAltRight} color={"#b40f0f"} size={"lg"}/>
                    </div>
                    <Time hour={"22:00"}/>
                </div>
                <span className={"disclaimer"}>All times displayed are expressed in current British Time</span>
            </div>
            <div className={"op-days"}>
                <h1>On which days?</h1>
                <div className={"days"}>
                    <div className={"day"}>
                        <div>
                            <h2>Wednesday</h2>
                            <span>Side Operation</span>
                        </div>
                        <div>
                            <p>On this day we have operations on smaller scales and that are least impact on the ongoing campaign.</p>
                        </div>
                    </div>
                    <div className={"day"}>
                        <div>
                            <h2>Saturday</h2>
                            <span>Main Operation</span>
                        </div>
                        <div>
                            <p> The main operation is pivotal to our activities: the most important missions are played and honors are awarded at the end of the mission.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>;
}
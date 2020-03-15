import React from "react";
import "./index.sass"
import Header from "./Header";
import About from "./About"
import Join from "./Join"
import PhotoSpacer from "../Photospacer"

import Screenshot1 from "../imgs/1495809735_Neaville.png"

export default function Home() {
    return <div className={"home"}>
        <Header/>
        <About/>
        <PhotoSpacer img={Screenshot1}/>
        <Join/>
    </div>;
}
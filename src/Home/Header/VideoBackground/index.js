import React, {useEffect} from "react";

import "./index.sass"

import videoSourceMp4 from "./bg.mp4"
import videoSourceWebm from "./bg.webm"

export default function VideoBackground() {

    const video = React.createRef();
    const maxVol = 0.1;
    const minVol = 0.001;

    useEffect(() => {
        if (video.current == null) {
            window.removeEventListener('scroll', changeVolume);
        }
        window.addEventListener('scroll', changeVolume);
    }, []);

    const changeVolume  = () => {
        if (video.current == null) {
            return;
        }
        const headerHeight = document.getElementById("header").clientHeight;
        if (window.scrollY > headerHeight) {
            if (video.current.volume === 0) {
                return;
            }
            video.current.volume = video.current.volume < minVol ? 0 : video.current.volume * 0.99;
        } else {
            if (video.current.volume === maxVol) {
                return;
            }
            if (video.current.volume === 0) {
                video.current.volume = minVol;
            } else {
                video.current.volume = video.current.volume > maxVol ? maxVol : video.current.volume * 1.01;
            }
        }
        setTimeout(changeVolume, 100);
    };

    const handleLoad = (e) => {
        e.target.volume = maxVol;
        changeVolume();
    };

    return (
        <div className={"video-background"}>
            <video ref={video} autoPlay={"autoPlay"} loop={"loop"} onCanPlay={handleLoad}>
                <source src={videoSourceWebm} type={"video/webm"}/>
                <source src={videoSourceMp4} type={"video/mp4"}/>
            </video>
        </div>
    )
}
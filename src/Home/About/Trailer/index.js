import React from "react";
import YouTube from 'react-youtube';

export default function Trailer() {
    return <div className={"trailer"}>
        <YouTube
            videoId={"ORIHGY-uucY"}
            opts={{
                width: 1024,
                height: 576,
                playerVars: {
                    autoplay: 0
                }
            }}
        />
    </div>;
}
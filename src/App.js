import React from 'react';
import './App.sass';
import AppRouter from "./Router";
import Song from "./audio/we_ll_meet_again.mp3"
import VideoBackground from "./VideoBackground";

function MusicBackground() {
    const turnDownVolume = (target) => {
        target.volume = target.volume * 0.99;
        if (target.volume < 0.001) {
            target.volume = 0;
            return
        }
        setTimeout(() => turnDownVolume(target), 100);
    };

    const handlePlay = (e) => {
        e.persist();
        e.target.volume = 0.05;
        setTimeout(() => {
            e.target.play();
            turnDownVolume(e.target)
        }, 500);
    };

    return <audio autoPlay onCanPlay={handlePlay}>
        <source src={Song}/>
    </audio>
}

function App() {

  return (
    <div className="app">
        <MusicBackground/>
        <VideoBackground/>
        <AppRouter/>
    </div>
  );
}

export default App;

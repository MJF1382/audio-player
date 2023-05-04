import React, { useRef, useState, useEffect } from "react";
import "../tailwind/App.css";
import moverIcon from "../pictures/mover.svg";
import playIcon from "../pictures/play.svg";
import pauseIcon from "../pictures/pause.svg";

const MusicPlayer = (props) => {
    const audio = useRef()
    const [duration, setDuration] = useState(0)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [paused, setPaused] = useState(true)
    const [percentTime, setPercentTime] = useState(0)
    const [isThumbSelected, setIsThumbSelected] = useState(false)

    const toTimeFormat = (input) => {
        const totalSeconds = ~~Number(input);

        if (totalSeconds >= 3600) {
            const seconds = ~~(totalSeconds % 3600)
            const minutes = ~~(totalSeconds % 60)
            const hours = ~~(totalSeconds / 3600)

            return String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
        }
        else if (totalSeconds >= 60) {
            const seconds = ~~(totalSeconds % 60)
            const minutes = ~~(totalSeconds / 60)

            return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
        }
        else {
            return "00:" + String(totalSeconds).padStart(2, "0");
        }
    }

    const onPlay = () => {
        if (audio.current.paused) {
            audio.current.play()
            setPaused(false)

            setCurrentDuration(audio.current.currentTime)
        } else {
            audio.current.pause()
            setPaused(true)
        }
    }

    const onAudioTimeUpdate = (event) => {
        const percentTimeValue = ((event.target.currentTime * 100) / duration) + (percentTime < 70 ? 0.7 : -0.7)

        if (isThumbSelected === false) {
            setCurrentDuration(event.target.currentTime)
            setPercentTime(percentTimeValue)
        }
    }

    const onTimeLineInput = (event) => {
        setIsThumbSelected(true)

        const percentTimeValue = ((event.target.value * 100) / duration) + (percentTime < 70 ? 0.7 : -0.7)

        setCurrentDuration(event.target.value)
        setPercentTime(percentTimeValue)
    }

    const onTimeLineMouseUp = (event) => {
        audio.current.currentTime = event.target.value
        setIsThumbSelected(false)
    }

    const onAudioEnded = () => {
        audio.current.pause()
        setPaused(true)
        setCurrentDuration(0)
        setPercentTime(0)
    }

    const onMoverBackClick = () => {
        audio.current.currentTime = currentDuration - 10
        setCurrentDuration(currentDuration - 10)
    }

    const onMoverForwardClick = () => {
        audio.current.currentTime = currentDuration + 10
        setCurrentDuration(currentDuration + 10)
    }

    return (
        <>
            <audio src={props.audio} ref={audio} onDurationChange={(event) => setDuration(event.target.duration)} onEnded={onAudioEnded} onTimeUpdate={(event) => onAudioTimeUpdate(event)}></audio>
            <div className="musicplayer mx-auto mt-[150px]">
                <div className="title">
                    {props.title}
                </div>
                <div className="control">
                    <button className="mover mover-back" onClick={onMoverBackClick}>
                        <img src={moverIcon} className="mover-icon" />
                    </button>
                    <div className="outercircle" onClick={onPlay}>
                        <button className="innercircle">
                            <img src={paused ? playIcon : pauseIcon} className={paused ? "play-icon" : "pause-icon"} />
                        </button>
                    </div>
                    <button className="mover mover-forward" onClick={onMoverForwardClick}>
                        <img src={moverIcon} className="mover-icon mover-forward-icon" />
                    </button>
                </div>
                <div className="duration">
                    <span className="time time-left">
                        {toTimeFormat(currentDuration)}
                    </span>
                    <span className="time time-right">
                        {toTimeFormat(duration)}
                    </span>
                    <input type="range" className="timeline" style={{ background: `linear-gradient(to right, rgb(221 214 254) ${percentTime}%, rgb(139 92 246) ${percentTime}%)` }} value={currentDuration} min={0} max={duration} onMouseUp={(event) => onTimeLineMouseUp(event)} onInput={(event) => onTimeLineInput(event)} />
                </div>
            </div>
        </>
    )
}

export default MusicPlayer;
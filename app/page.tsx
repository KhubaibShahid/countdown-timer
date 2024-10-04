"use client"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useState, useRef } from "react"

export default function App() {

    const [duration, setDuration] = useState("");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [ispause, setIspause] = useState(false);
    // const [isStart, setIsstart] = useState(false);
    const timeRef = useRef<NodeJS.Timeout | null>(null);

    function convert() {
        if (timeRef.current) {
            clearInterval(timeRef.current);
        }
        setIspause(false);

        let min = 0;
        let sec = 0;

        min = Math.floor(+duration / 60);
        sec = +duration % 60

        setMinutes(String(min).padStart(2, "0"));
        setSeconds(String(sec).padStart(2, "0"));
        setDuration("");

    }

    function startTimer() {
        let sec = Number(seconds);
            let min = Number(minutes);
            timeRef.current = setInterval(() => {
                    if (sec != 0) {
                        sec = sec - 1;
                        setSeconds(String(sec).padStart(2, "0"));
                    } else {
                        if (min == 0) {
                            if (timeRef.current) {
                                clearInterval(timeRef.current);
                            }
                        } else {
                            min = min - 1;
                            sec = 59;
                            setSeconds(String(sec).padStart(2, "0"));
                            setMinutes(String(min).padStart(2, "0"));
                        }
                    }
            }, 1000);
    }

    function resetTimer() {
        if (timeRef.current) {
            clearInterval(timeRef.current);
        }
        setIspause(false);
        setMinutes("00");
        setSeconds("00");
    }

    function resumeTimer() {
        startTimer();
        setIspause(false)
    }

    function pauseTimer() {
        if (timeRef.current) {
            clearInterval(timeRef.current)
        }
        setIspause(true);
    }

    return (
        <div className="main bg-gray-100 pt-36 px-2">
            <div className="box bg-white mx-auto rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center">Countdown Timer</h1>
                <div className="section1 flex mt-3 gap-5 justify-center">
                    <Input value={duration} onChange={(e) => setDuration(e.target.value)} className="max-w-96 rounded-md" placeholder="Enter duration in seconds" type="number" />
                    <Button onClick={() => {
                        if (duration) {
                            convert()
                        }
                    }} variant="outline" className="rounded-md" >Set</Button>
                </div>
                <div className="flex justify-center mt-5 text-6xl font-bold">
                    <div className="">{minutes}</div>
                    <div>:</div>
                    <div>{seconds}</div>
                </div>
                <div className="mt-5 flex justify-center gap-5">
                    {ispause ? <Button onClick={() => resumeTimer()} variant="outline" className="rounded-md">Resume</Button>
                        :
                        <Button onClick={() => startTimer()} variant="outline" className="rounded-md">Start</Button>

                    }

                    <Button onClick={() => pauseTimer()} variant="outline" className="rounded-md">Pause</Button>
                    <Button onClick={() => {resetTimer()}} variant="outline" className="rounded-md">Reset</Button>
                </div>
            </div>
        </div>
    )
} 
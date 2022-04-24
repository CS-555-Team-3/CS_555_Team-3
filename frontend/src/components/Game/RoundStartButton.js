import { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';

export default function RoundStartButton(props) {
    
    const time = props.time;
    const [countdown_time , setCountDownTime] = useState(0);
    const setTime = props.setTime;
    const totalTime = props.totalTime;
    const setTotalTime = props.setTotalTime;
    let timer = useRef();
    let timer2 = useRef();
    const [countdown, setCountDown] = useState(true);
    const [clicked, setClicked] = useState(false);
    let roundTime=props.roundTime;

    useEffect(() => { 
        if(countdown_time <0) setCountDown(false);        
        }, 
        [countdown_time]
    );

    // tune from parent component
    const tune = props.value;

    // show-timer settings from parent component
    const show_timer = props.timer;
    let delaytime = 9
    if (props.order.length === 6) {
        delaytime = 8
    }

    // once the user click the button, play the tune
    const onClick = () => {
        setCountDownTime(delaytime);
        timer2.current = setInterval(() => {
            setCountDownTime((n) => {
                return n - 1;
            });
        }, 1000)
    

        setTimeout(() => {
            props.onClick();
        try {
            setClicked(true);
            tune.play();
        } catch (e) {
            console.log('play audio error: ', e);
        }
        // start count time
        setTotalTime(-delaytime+3);
        setTime(-delaytime+3);
        timer.current = setInterval(() => {
            setTotalTime((n) => {
                return n + 1;
            });
            setTime((n) => {
                return n + 1;
            });
        }, 1000);}, 3000)


    };

    return (
        <div>
            <Button className="roundStart" onClick={onClick} disabled={clicked}>
                Start Round!
            </Button>
            <p id='timeAlert'>{time >= (roundTime * 0.75) && time <= roundTime ? `Game will end in ${roundTime-time} seconds if you haven't submitted answer` : ''}</p>
            {countdown && <h4 id='totalTime'>{countdown_time} Second{countdown_time === 0 ? '' : 's'}</h4>}
            {!countdown && <h4 id='totalTime'>{totalTime} Second{totalTime === 0 ? '' : 's'}</h4>}
            {!countdown && <h4 id='time'>Round Time: {time} Second{time === 0 ? '' : 's'}</h4>}
            
            <br></br>
        </div>
    );
}
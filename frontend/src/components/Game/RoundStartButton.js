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
        <>
            {!clicked ? <Button className="roundStart" onClick={onClick} variant="contained" disabled={clicked}>
                Start Round!
            </Button> :
            <>
                {time >= (roundTime * 0.75) && time <= roundTime ? <h4 id='timeAlert'>`Game ends in {roundTime-time} seconds if you do not submit an answer!`</h4> : <></>}
                <h4 id='totalTime'>{countdown ? `Get Ready! ${countdown_time} Second${countdown_time === 0 ? '' : 's'}` : `Round Time: ${totalTime} Second${totalTime === 0 ? '' : 's'}`}</h4>            
            </>
            }
        </>
    );
}
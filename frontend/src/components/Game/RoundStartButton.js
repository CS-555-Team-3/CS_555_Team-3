import { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';

export default function RoundStartButton(props) {
    
    const time = props.time
    const [countdown_time , setCountDownTime] = useState(0);
    const setTime = props.setTime
    const totalTime = props.totalTime
    const setTotalTime = props.setTotalTime
    let timer = useRef();
    let timer2 = useRef();
    const [countdown, setCountDown] = useState(true);
    const [clicked, setClicked] = useState(false);

    let roundTime=props.roundTime

    useEffect(() => { 
        if(countdown_time <0){
            setCountDown(false);        
        }
        }, 
        [countdown_time]
    );

    // tune from parent component
    const tune = props.value;

    // show-timer settings from parent component
    const show_timer = props.timer;
   
    // once the user click the button, play the tune
    const onClick = () => {
        setCountDownTime(3);
        timer2.current = setInterval(() => {
            setCountDownTime((n) => {
                return n - 1;
            });
        }, 1000)
    

        setTimeout(() => {
            props.onClick();
        try {
            setClicked(true);
            //const delay = setTimeout(tune.play(), 5000);
            tune.play();
        } catch (e) {
            console.log('play audio error: ', e);
        }
        // start count time
        //TODO wait until sound is done playing for count time to begin
        setTime(0);
        setTotalTime(0);
        timer.current = setInterval(() => {
            setTime((n) => {
                return n + 1;
            });
            setTotalTime((n) => {
                return n + 1;
            });
        }, 1000);}, 3000)


    };
     //   when time is going to run out, it will remind the user 
    return (
        <div>
            <div>
                {countdown && <h4 id='totalTime'>{countdown_time} Second{countdown_time === 0 ? '' : 's'}</h4>}
                {!countdown && <h4 id='totalTime'>Total Time: {totalTime} Second{totalTime === 0 ? '' : 's'}</h4>}
                <h4 id='time'>Round Time: {time} Second{time === 0 ? '' : 's'}</h4>
                <p id='timeAlert'>{time >= (roundTime * 0.75) && time <= roundTime ? `Game will end in ${roundTime-time} seconds if you haven't submitted answer` : ''}</p>
                <Button className="roundStart" onClick={onClick} disabled={clicked}>
                    Round Start
                </Button> 

                <br></br>
            </div>
        </div>
    );
}
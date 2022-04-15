import { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';

export default function RoundStartButton(props) {
    
    const time = props.time
    const [countdown_time , setCountDownTime] = useState(0);
    const setTime = props.setTime
    let timer = useRef();
    let timer2 = useRef();
    const [countdown, setCountDown] = useState(true);
    const [clicked, setClicked] = useState(false);

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
        timer.current = setInterval(() => {
            setTime((n) => {
                return n + 1;
            });
        }, 1000);}, 3000)


    };

    const Timer = () => {
        const {initialMinute = 0,initialSeconds = 0} = props;
        const [ minutes, setMinutes ] = useState(initialMinute);
        const [seconds, setSeconds ] =  useState(initialSeconds);
        useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });
    
        return (
            <div>
            { minutes === 0 && seconds === 0
                ? null
                : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
            }
            </div>
        )
    };

    return (
        <div>
            <div>
                <Button className="roundStart" onClick={onClick} disabled={clicked}>
                    Round Start
                </Button>
                {countdown && <h4 id='time'>{countdown_time} Second{countdown_time === 0 ? '' : 's'}</h4>}
                {!countdown && <h4 id='time'>{time} Second{time === 0 ? '' : 's'}</h4>}
                <br></br>
            </div>
        </div>
    );
}
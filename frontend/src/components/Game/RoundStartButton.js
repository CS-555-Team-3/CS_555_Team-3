import { useState, useRef } from 'react';
import { Button } from '@mui/material';

export default function RoundStartButton(props) {
    // count time
    const time = props.time
    const setTime = props.setTime
    let timer = useRef();

    const [clicked, setClicked] = useState(false);

    // tune from parent component
    const tune = props.value;

    // show-timer settings from parent component
    const show_timer = props.timer;

    // once the user click the button, play the tune
    const onClick = () => {
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
     //   when time is at 150 seconds, it will remind user that there is not much time left for 5 seconds
     //   and you can define how long to display it
    return (
        <div>
            <div>           
                <Button className="roundStart" onClick={onClick} disabled={clicked}>
                    Round Start
                </Button>
                <p>{time >= 150 && time <= 155 ? `${180-time} seconds left until the end of game` : ''}</p>  
                <h4 id='time'>{time} Second{time === 0 ? '' : 's'}</h4>
            </div>
        </div>
    );
}

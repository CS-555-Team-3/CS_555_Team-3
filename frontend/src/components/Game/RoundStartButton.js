import { useState, useRef } from 'react';
import { Button } from '@mui/material';

export default function RoundStartButton(props) {
    // count time
    const [time, setTime] = useState(0);
    let timer = useRef();

    const [clicked, setClicked] = useState(false);

    // tune from parent component
    const tune = props.value;

    // once the user click the button, play the tune
    const onClick = () => {
        props.onClick();
        try {
            setClicked(true);
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
        }, 1000);
    };

    return (
        <div>
            <div>
                <Button className="roundStart" onClick={onClick} disabled={clicked}>
                    Round Start
                </Button>
                <h4>{time} Second{time === 0 ? '' : 's'}</h4>
                <br></br>
            </div>
        </div>
    );
}

import { useState, useRef } from 'react';
import { Button } from '@mui/material';

export default function RoundStartButton(props) {
    // count time
    const [time, setTime] = useState(0);
    let timer = useRef();

    // tune from parent component
    const tune = props.value;

    // once the user click the button, play the tune
    const onClick = () => {
        props.onClick();
        try {
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
                <Button className="roundStart" onClick={onClick}>
                    Round Start
                </Button>
                <h5>{time} Second{time === 0 ? '' : 's'}</h5>
            </div>
        </div>
    );
}

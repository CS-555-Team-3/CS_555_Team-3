import { useState, useRef } from 'react';

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
        setTime(0);
        timer.current = setInterval(() => {
            //console.log(timer);
            setTime((n) => {
                return n + 1;
            });
        }, 1000);
    };

    return (
        <div>
            <div align="left">
                <button className="roundStart" onClick={onClick}>
                    Round Start
                </button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div align="right">
                <p>{time} Seconds</p>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';

export default function RoundStartButton(props)
{
    const [clicked, setClicked] = useState(false);
    // tune from parent component
    const tune = props.value;

    // once the user click the button, play the tune
    const onClick = () =>
    {
      try {
        setClicked(true);
        tune.play();
      }
      catch (e) {
        console.log('play audio error: ', e)
      }
    }

    return (
        <button className="roundStart" onClick={onClick} disabled = {clicked}>Round Start</button>
    );
}
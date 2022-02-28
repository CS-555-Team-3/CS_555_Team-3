export default function RoundStartButton(props)
{
    // tune from parent component
    const tune = props.value;

    // once the user click the button, play the tune
    const onClick = () =>
    {
      tune.play();
    }

    return (
        <button className="roundStart" onClick={onClick}>Round Start</button>
    );
}
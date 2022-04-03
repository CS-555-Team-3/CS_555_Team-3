import {render, cleanup, userEvent} from "@testing-library/react";
import PrintScores from "../PrintScores";
import ResultButton from "../ResultButton";

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<PrintScores />, div);
});

test('score adds', () => {
    render(<ResultButton />,<PrintScores />)
    let scores = document.getElementsByClassName('scoreGroup')
    Array.from(scores).forEach((score)=> {
        userEvent.click(getElementById('resultButton'));
        expect(score==0)
    })
});

test('time and difficulty present', () => {
    render(<ResultButton />,<PrintScores />)
    let scores = document.getElementsByClassName('scoreGroup')
    Array.from(scores).forEach((score)=> {
        userEvent.click(getElementById('resultButton'));
        expect(score.time>=0 && score.time <= 0.1)
        expect(score.difficulty.length() == 1)
    })
});
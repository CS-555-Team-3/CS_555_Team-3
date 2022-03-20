import {render, cleanup} from "@testing-library/react";
import PrintScores from "../PrintScores";

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<PrintScores />, div);
});
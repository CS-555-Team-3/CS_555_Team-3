import {render, cleanup} from "@testing-library/react";
import PlayNote from "../PlayNote";

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<PlayNote />, div);
});
import {render, cleanup} from "@testing-library/react";
import Score from "../Score";

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<Score />, div);
});
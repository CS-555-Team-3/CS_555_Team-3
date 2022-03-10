import {render, cleanup} from "@testing-library/react";
import RoundStartButton from "../RoundStartButton";

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<RoundStartButton />, div);
});
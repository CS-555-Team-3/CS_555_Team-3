import {render, cleanup} from "@testing-library/react";
import BoxRow from "../BoxRow";

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    const test_order = ["E", "D", "E", "D"];
    render(<BoxRow order={test_order}/>, div);
});
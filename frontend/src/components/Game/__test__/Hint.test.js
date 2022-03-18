import {render, cleanup} from "@testing-library/react";
import Hint from '../Hint';

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<Hint />, div);
});
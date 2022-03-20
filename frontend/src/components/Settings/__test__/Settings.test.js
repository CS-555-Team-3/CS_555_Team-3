import {render, cleanup} from "@testing-library/react";
import Settings from '../Settings';

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<Settings />, div);
});
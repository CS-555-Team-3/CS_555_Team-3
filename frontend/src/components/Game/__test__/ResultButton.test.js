import {render, cleanup} from "@testing-library/react";
import ResultButton from '../ResultButton';

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<ResultButton />, div);
});
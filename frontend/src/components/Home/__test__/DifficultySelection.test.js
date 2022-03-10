import {render, cleanup} from "@testing-library/react";
import DifficultySelection from "../DifficultySelection";

afterEach(cleanup);

test('renders', () => {
    const div = document.createElement("div")
    render(<DifficultySelection />, div);
});
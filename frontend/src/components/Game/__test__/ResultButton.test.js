import { render, screen, cleanup } from "@testing-library/react";
import ResultButton from "../ResultButton";
import userEvent from '@testing-library/user-event';
import React from "react";


afterEach(cleanup);
afterEach(() => {
  jest.clearAllMocks();
});

describe("Are boxes painted correctly after clicking resultButton", () => {
  test("submit answer and box is painted", async () => {
    // ans order = ["A", "B", "C", "D"]
    // user choice = ["A", "C", "G", "D"]
    // expect color = ["green", "yellow", "red", "green"]
    const order = ["A", "B", "C", "D"];
    const boxes = ["first", "second", "third", "fourth"];
    
    render(
        <div id="gameContainer">
                <div id="answerContainer">
                    <div className='resultRows'></div>
                    <div className='placement'>
                        <button id={boxes[0]} className='notes'  disabled >A</button>
                        <button id={boxes[1]} className='notes' disabled>C</button>
                        <button id={boxes[2]} className='notes' disabled>G</button>
                        <button id={boxes[3]} className='notes' disabled>D</button>
                        
                    </div>
                </div>
                <div>
                <ResultButton order={order}  >Submit Answer</ResultButton>
                </div>

            </div>
    
    );
    userEvent.click(screen.getByText('Submit Answer'));
    expect(document.getElementById(boxes[0]).style.backgroundColor).toBe("green");
    expect(document.getElementById(boxes[1]).style.backgroundColor).toBe("yellow");
    expect(document.getElementById(boxes[2]).style.backgroundColor).toBe("red");
    expect(document.getElementById(boxes[3]).style.backgroundColor).toBe("green");
  });
});

import { render, screen, cleanup } from "@testing-library/react";
import ResultButton from "../ResultButton";
import ResultRow from "../ResultRow";
import userEvent from '@testing-library/user-event';
import React from "react";


afterEach(cleanup);

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
                    <div className='resultRows'>
                      <ResultRow numBoxes={4} index={0}></ResultRow>
                    </div>
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
    expect(document.getElementById(boxes[0]).style.backgroundColor).toBe("");
    expect(document.getElementsByClassName("green").length).toBe(2);
    expect(document.getElementsByClassName("red").length).toBe(1);
    
  });
});

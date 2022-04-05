import { render, screen, cleanup } from "@testing-library/react";
import ResultButton from "../ResultButton";
import userEvent from '@testing-library/user-event';
import React from "react";
import { green } from "@mui/material/colors";

afterEach(cleanup);
afterEach(() => {
  jest.clearAllMocks();
});

describe("Does box lighted up", () => {
  test("submit answer and box is painted", async () => {
    const order = ["A", "B", "C", "D"];
    const userChoice = ["A", "C", "G", "D"];
    const boxes = ["first", "second", "third", "fourth"];
    
    render(
        <div id="gameContainer">
                <div id="answerContainer">
                    <div className='resultRows'></div>
                    <div className='placement'>
                        <button id={boxes[0]} className='notes'  disabled> A</button>
                        <button id={boxes[1]} className='notes' disabled> B</button>
                        <button id={boxes[2]} className='notes' disabled> C</button>
                        <button id={boxes[3]} className='notes' disabled> D </button>
                        
                    </div>
                </div>
                <div>
                <ResultButton order={order} userChoice = {userChoice} boxes = {boxes}  >Submit Answer </ResultButton>
                </div>
            </div>
    
    );
    userEvent.click(screen.getByText('Submit Answer'));
    expect(screen.getAllByText('A').length).toBe(1);
    expect(screen.getAllByText('C').length).toBe(1);
    expect(screen.queryByText('G')).not.toBeInTheDocument();
    expect(screen.getAllByText('D').length).toBe(1);
  });
});

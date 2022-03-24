import RoundStartButton from "../RoundStartButton";
import { render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);
afterEach(()=>
{
    jest.clearAllMocks();
})

beforeEach(()=> jest.setTimeout(30000));

describe('Does click highlight note', () =>
{
    test('Highlight', async () =>
    {
        const audio = new Audio('/sound_notes/A.wav');
        const onClick = jest.fn();
        render(
            <RoundStartButton value={audio} onClick={onClick}></RoundStartButton>
        );
        let button = document.getElementsByClassName('roundStart');
        act(()=>
        Array.from(button).forEach((note)=>
        {
            userEvent.click(note);
        }));
        
        // if click roundStart, highlight function is called
        expect(onClick).toHaveBeenCalled();
    })
})
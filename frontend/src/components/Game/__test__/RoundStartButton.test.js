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

describe('Does click play tune and activate highlight', () =>
{
    test('play tune and hightlight', async () =>
    {
        const audio = new Audio('/sound_notes/A.wav');

        const playTune = jest
            .spyOn(window.HTMLMediaElement.prototype, 'play')

        const onClick = jest.fn();
        render(
            <RoundStartButton value={audio} onClick={onClick}></RoundStartButton>
        );
        let button = document.getElementsByClassName('roundStart');
        act(()=>
        Array.from(button).forEach((b)=>
        {
            userEvent.click(b);
        }));

        
        // if click roundStart, play tune and highlight function is called
        expect(playTune).toHaveBeenCalled()
        expect(onClick).toHaveBeenCalled();
    })
})
import NoteButton from "../NoteButton";
import { render, cleanup, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);
afterEach(()=>
{
    jest.clearAllMocks();
})

beforeEach(()=> jest.setTimeout(30000));

const the_mode = "on";

describe('Does click highlight note', () =>
{
    test('Highlight', async () =>
    {
        render(
        <>
            <NoteButton note="A_flat" mode={the_mode}>😊</NoteButton>
            <NoteButton note="A" mode={the_mode}>😂</NoteButton>
            <NoteButton note="B_flat" mode={the_mode}>❤️</NoteButton>
            <NoteButton note="B" mode={the_mode}>😁</NoteButton>
            <NoteButton note="C" mode={the_mode}>😍</NoteButton>
            <NoteButton note="D_flat" mode={the_mode}>😎</NoteButton>
            <NoteButton note="D" mode={the_mode}>🎶</NoteButton>
            <NoteButton note="E_flat" mode={the_mode}>💕</NoteButton>
            <NoteButton note="E" mode={the_mode}>🤩</NoteButton>
            <NoteButton note="F" mode={the_mode}>😴</NoteButton>
            <NoteButton note="G_flat" mode={the_mode}>😉</NoteButton>
            <NoteButton note="G" mode={the_mode}>😋</NoteButton>
        </>
        );
        let elements = document.getElementsByClassName('playnote');
        act(()=>
        Array.from(elements).forEach((note)=>
        {
            userEvent.click(note);
        }));
        //one selected item
        waitFor(()=>expect(document.getElementsByClassName('selected').length).toBe(1));
    })
})
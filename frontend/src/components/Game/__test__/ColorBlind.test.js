import NoteButton from "../NoteButton";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import { act } from 'react-dom/test-utils';
import { ExpandCircleDownTwoTone, JoinLeftSharp } from "@mui/icons-material";

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
        render(
            <NoteButton note="A_flat">Ab</NoteButton>
        );
        render(
            <NoteButton note="A">A</NoteButton>
        );
        render(
            <NoteButton note="B_flat">Bb</NoteButton>
        );
        render(
            <NoteButton note="B">B</NoteButton>
        );
        render(
            <NoteButton note="C">C</NoteButton>
        );
        render(
            <NoteButton note="D_flat">Db</NoteButton>
        );
        render(
            <NoteButton note="D">D</NoteButton>
        );
        render(
            <NoteButton note="E_flat">Eb</NoteButton>
        );
        render(
            <NoteButton note="E">E</NoteButton>
        );
        render(
            <NoteButton note="F">F</NoteButton>
        );
        render(
            <NoteButton note="G_flat">Gb</NoteButton>
        );
        render(
            <NoteButton note="G">G</NoteButton>
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
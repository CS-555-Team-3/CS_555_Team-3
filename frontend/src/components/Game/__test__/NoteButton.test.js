import NoteButton from "../NoteButton";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
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
        render(
            <NoteButton note="B_flat">Bb</NoteButton>
        );
        let elements = document.getElementsByClassName('playnote');
        act(()=>
        Array.from(elements).forEach((note)=>
        {
            userEvent.click(note);
        }));
        //one selected item
        await waitFor(()=>expect(document.getElementsByClassName('selected').length).toBe(1));
    })
})
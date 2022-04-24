import UndoSelection from '../UndoSelection.js';
import NoteButton from '../NoteButton.js';
import NoteButtonRow from '../NoteButtonRow.js';
import SetNote from '../SetNote.js';
import { render,screen,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

afterEach(cleanup);

describe('Does Undo Selection Exist', () => {
    const order = ["A", "B", "A", "A"]
    render ( 
        <div id="undo">
            <UndoSelection order={order}>Undo Selection</UndoSelection>
        </div>
    );
    test('Exists', () => {
        expect(screen.getByText('Undo Selection'))
    });
});

describe('Does it Undo', () => {
    const order = ["A", "B", "A", "A"]
    test('Undoes', async () => {
        render(
            <div id="gameContainer">
                <div id="answerContainer">
                    <div className='resultRows'></div>
                    <div className='placement'>
                        <div id='first' className='notes'  disabled></div>
                        <div id='second' className='notes' disabled></div>
                        <div id='third' className='notes' disabled></div>
                        <div id='fourth' className='notes' disabled></div>
                        <div id='fifth' className='notes' disabled></div>
                    </div>
                </div>
                <NoteButtonRow 
                    order={order} 
                    duration={2000} 
                    instrument={'piano'}
                    color_blind={false}>
                </NoteButtonRow>
                <div id="undo">
                    <UndoSelection order={["A", "B", "A", "A"]}>Undo Selection</UndoSelection>
                </div>
            </div>
        );
        userEvent.click(document.getElementsByClassName("A")[0].firstChild);
        await expect(document.getElementsByClassName("A").length).toBe(4);
        userEvent.click(screen.getByText('Undo Selection'));
        await expect(document.getElementsByClassName("A").length).toBe(3);
    });
});

describe('Does it Undo Multiple', () => {
    const order = ["A", "B", "A", "A"]
    test('Undoes', () => {
        render(
            <div id="gameContainer">
                <div id="answerContainer">
                    <div className='resultRows'></div>
                    <div className='placement'>
                        <button id='first' className='notes'  disabled></button>
                        <button id='second' className='notes' disabled></button>
                        <button id='third' className='notes' disabled></button>
                        <button id='fourth' className='notes' disabled></button>
                        <button id='fifth' className='notes' disabled></button>
                    </div>
                </div>
                <div id="noteContainer">    
                    <NoteButton order={order} note="A_flat">Ab</NoteButton>
                    <NoteButton order={order} note="A">A</NoteButton>
                    <NoteButton order={order} note="B_flat">Bb</NoteButton>      
                    <NoteButton order={order} note="B">B</NoteButton>
                    <NoteButton order={order} note="C">C</NoteButton>
                    <NoteButton order={order} note="D_flat">Db</NoteButton>
                    <NoteButton order={order} note="D">D</NoteButton>
                    <NoteButton order={order} note="E_flat">Eb</NoteButton>
                    <NoteButton order={order} note="E">E</NoteButton>
                    <NoteButton order={order} note="F">F</NoteButton>
                    <NoteButton order={order} note="G_flat">Gb</NoteButton>
                    <NoteButton order={order} note="G">G</NoteButton>
                </div>
                <div id="undo">
                    <UndoSelection order={order}>Undo Selection</UndoSelection>
                </div>
            </div>
        );
        userEvent.click(document.getElementsByClassName('setNote A_flat')[0]);
        expect(document.getElementsByClassName('A_flat').length).toBe(4);

        userEvent.click(document.getElementsByClassName('setNote A')[0]);
        expect(document.getElementsByClassName('A').length).toBe(4);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(document.getElementsByClassName('A').length).toBe(3);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(document.getElementsByClassName('A_flat').length).toBe(3);
    });
});

describe('Does it Handle Multiple of the Same', () => {
    const order = ["A", "B", "A", "A"]
    test('Undoes', () => {
        render(
            <div id="gameContainer">
                <div id="answerContainer">
                    <div className='resultRows'></div>
                    <div className='placement'>
                        <button id='first' className='notes'  disabled></button>
                        <button id='second' className='notes' disabled></button>
                        <button id='third' className='notes' disabled></button>
                        <button id='fourth' className='notes' disabled></button>
                        <button id='fifth' className='notes' disabled></button>
                    </div>
                </div>
                <div id="noteContainer">    
                    <NoteButton order={order} note="A_flat">Ab</NoteButton>
                    <NoteButton order={order} note="A">A</NoteButton>
                    <NoteButton order={order} note="B_flat">Bb</NoteButton>      
                    <NoteButton order={order} note="B">B</NoteButton>
                    <NoteButton order={order} note="C">C</NoteButton>
                    <NoteButton order={order} note="D_flat">Db</NoteButton>
                    <NoteButton order={order} note="D">D</NoteButton>
                    <NoteButton order={order} note="E_flat">Eb</NoteButton>
                    <NoteButton order={order} note="E">E</NoteButton>
                    <NoteButton order={order} note="F">F</NoteButton>
                    <NoteButton order={order} note="G_flat">Gb</NoteButton>
                    <NoteButton order={order} note="G">G</NoteButton>
                </div>
                <div id="undo">
                    <UndoSelection order={order}>Undo Selection</UndoSelection>
                </div>
            </div>
        );
        userEvent.click(document.getElementsByClassName('setNote A_flat')[0]);
        expect(document.getElementsByClassName('A_flat').length).toBe(4);

        userEvent.click(document.getElementsByClassName('setNote A_flat')[0]);
        expect(document.getElementsByClassName('A_flat').length).toBe(5);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(document.getElementsByClassName('A_flat').length).toBe(4);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(document.getElementsByClassName('A_flat').length).toBe(3);
    });
});
import UndoSelection from '../UndoSelection.js';
import NoteButton from '../NoteButton.js';
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
        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(1);
        userEvent.click(screen.getByText('Undo Selection'));
        expect(screen.queryByText('A_flat')).not.toBeInTheDocument();
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
        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(1);

        userEvent.click(screen.getByText('A'));
        expect(screen.getAllByText('A').length).toBe(2);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(screen.getAllByText('A').length).toBe(1);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(screen.queryByText('A_flat')).not.toBeInTheDocument();
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
        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(1);

        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(2);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(screen.getAllByText('A_flat').length).toBe(1);

        userEvent.click(screen.getByText('Undo Selection'));
        expect(screen.queryByText('A_flat')).not.toBeInTheDocument();
    });
});
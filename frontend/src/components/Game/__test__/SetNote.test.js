import NoteButton from '../NoteButton.js';
import { render,screen,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

afterEach(cleanup);

describe('Does it add to answers', () => {
    test('answers', () => {
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
                    <NoteButton note="A_flat">Ab</NoteButton>
                    <NoteButton note="A">A</NoteButton>
                    <NoteButton note="B_flat">Bb</NoteButton>      
                    <NoteButton note="B">B</NoteButton>
                    <NoteButton note="C">C</NoteButton>
                    <NoteButton note="D_flat">Db</NoteButton>
                    <NoteButton note="D">D</NoteButton>
                    <NoteButton note="E_flat">Eb</NoteButton>
                    <NoteButton note="E">E</NoteButton>
                    <NoteButton note="F">F</NoteButton>
                    <NoteButton note="G_flat">Gb</NoteButton>
                    <NoteButton note="G">G</NoteButton>
                </div>
            </div>
        );
        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(1);

    });
});

describe('Does it handle multiple of the same note', () => {
    test('answers', () => {
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
                    <NoteButton note="A_flat">Ab</NoteButton>
                    <NoteButton note="A">A</NoteButton>
                    <NoteButton note="B_flat">Bb</NoteButton>      
                    <NoteButton note="B">B</NoteButton>
                    <NoteButton note="C">C</NoteButton>
                    <NoteButton note="D_flat">Db</NoteButton>
                    <NoteButton note="D">D</NoteButton>
                    <NoteButton note="E_flat">Eb</NoteButton>
                    <NoteButton note="E">E</NoteButton>
                    <NoteButton note="F">F</NoteButton>
                    <NoteButton note="G_flat">Gb</NoteButton>
                    <NoteButton note="G">G</NoteButton>
                </div>
            </div>
        );
        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(1);
        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(2);
    });
});

describe('Does it handle multiple different notes', () => {
    test('answers', () => {
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
                    <NoteButton note="A_flat">Ab</NoteButton>
                    <NoteButton note="A">A</NoteButton>
                    <NoteButton note="B_flat">Bb</NoteButton>      
                    <NoteButton note="B">B</NoteButton>
                    <NoteButton note="C">C</NoteButton>
                    <NoteButton note="D_flat">Db</NoteButton>
                    <NoteButton note="D">D</NoteButton>
                    <NoteButton note="E_flat">Eb</NoteButton>
                    <NoteButton note="E">E</NoteButton>
                    <NoteButton note="F">F</NoteButton>
                    <NoteButton note="G_flat">Gb</NoteButton>
                    <NoteButton note="G">G</NoteButton>
                </div>
            </div>
        );
        userEvent.click(screen.getByText('Ab'));
        expect(screen.getAllByText('A_flat').length).toBe(1);
        userEvent.click(screen.getByText('A'));
        expect(screen.getAllByText('A_flat').length).toBe(1);
        expect(screen.getAllByText('A').length).toBe(2);
    });
});


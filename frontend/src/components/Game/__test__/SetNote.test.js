import NoteButton from '../NoteButton.js';
import { render,screen,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

afterEach(cleanup);

describe('Does it add to answers', () => {
    const order = ["A", "B", "A", "A"]
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
            </div>
        );
        userEvent.click(document.getElementsByClassName("setNote A_flat")[0]);
        expect(document.getElementsByClassName("A_flat").length).toBe(4);

    });
});

describe('Does it handle multiple of the same note', () => {
    const order = ["A", "B", "A", "A"]
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
            </div>
        );
        userEvent.click(document.getElementsByClassName("setNote A_flat")[0]);
        expect(document.getElementsByClassName("A_flat").length).toBe(4);
        userEvent.click(document.getElementsByClassName("setNote A_flat")[0]);
        expect(document.getElementsByClassName("A_flat").length).toBe(5);
    });
});

describe('Does it handle multiple different notes', () => {
    const order = ["A", "B", "A", "A"]
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
            </div>
        );
        userEvent.click(document.getElementsByClassName("setNote A_flat")[0]);
        expect(document.getElementsByClassName("A_flat").length).toBe(4);
        userEvent.click(document.getElementsByClassName("setNote A_flat")[0]);
        expect(document.getElementsByClassName("A_flat").length).toBe(5);
        expect(document.getElementsByClassName("A").length).toBe(3);
    });
});


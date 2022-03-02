import UndoSelection from './UndoSelection.js';
import { render,screen } from '@testing-library/react';
import React from 'react';

describe('Does Undo Selection Exist', () => {
    test('Exists', () => {
        expect(screen.getByText('Undo Selection')).toBeInTheDocument();
    });
});

describe('Does it Undo', () => {
    test('Undoes', () => {
        render(<App />);

        document.getElementById("first") = 'A';
        UndoSelection({children = "Undo Selection"});
        expect(document.getElementById("first")).toBe("");
    });
});

describe('Does it Undo 2', () => {
    test('Undoes', () => {
        render(<App />);

        document.getElementById("first") = 'A';
        document.getElementById("second") = 'A';
        UndoSelection({children = "Undo Selection"});
        UndoSelection({children = "Undo Selection"});
        expect(document.getElementById("first")).toBe("");
    });
});
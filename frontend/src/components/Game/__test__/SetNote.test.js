import SetNote from './SetNote.js';
import { render,screen } from '@testing-library/react';
import React from 'react';

describe('Does it add to answers', () => {
    test('answers', () => {
        render(<App />);

        SetNote({note = 'A', children = ""})
        expect(document.getElementById("first")).toBe("A");
    });
});

describe('Does it add to answers correctly', () => {
    test('answers', () => {
        render(<App />);

        SetNote({note = 'A', children = ""})
        SetNote({note = 'Ab', children = ""})
        expect(document.getElementById("first")).toBe("A");
    });
});

describe('Does it add to answers correctly 2', () => {
    test('answers', () => {
        render(<App />);

        SetNote({note = 'A', children = ""})
        SetNote({note = 'Ab', children = ""})
        expect(document.getElementById("second")).toBe("Ab");
    });
});
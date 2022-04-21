import TutorialEntry from '../TutorialEntry';
import { render,screen,cleanup } from '@testing-library/react';
import React from 'react';

afterEach(cleanup);

describe('Does it enter correctly', () => {
    test('render', () => {
        render(<TutorialEntry></TutorialEntry>)
        expect(screen.getAllByText("HOW TO PLAY SOUNDLE").length).toBe(1);
        expect(screen.getAllByText("Close").length).toBe(1);
    });
});
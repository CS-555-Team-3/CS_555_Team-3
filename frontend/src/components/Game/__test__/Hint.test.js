import Hint from "../Hint";
import { render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

afterEach(cleanup);
afterEach(()=>
{
    jest.clearAllMocks();
})

beforeEach(()=> jest.setTimeout(30000));
Enzyme.configure({ adapter: new Adapter() });


describe('Test if Hint works ', () =>
{
    test('play tune 1--> does the tune play when you mock play it ', async () =>
    {
        
        const audio = new Audio('/sound_notes/A.wav');
        const playTune = jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation( () => {} );

        // test to make sure the tune is being played on a mock click 
        setTimeout(() => {
            expect(playTune).toHaveBeenCalled()
        }, 4000)
    });


    test('play tune 2 -> does the hint button click work', async () =>
    {
        const audio = new Audio('/sound_notes/A.wav');

        render( <Hint onClick={audio} /> );
        let button = document.getElementsByClassName('hint');
        act(()=>{
            userEvent.click(button[0]);
        });


        setTimeout(() => {
            expect(onClick).toHaveBeenCalled();
        }, 4000)
    });


    test('Deos the button render', () => {
        const div = document.createElement("div")
        render(<Hint />, div);
    });
})
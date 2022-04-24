import RoundStartButton from "../RoundStartButton";
import { render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

afterEach(cleanup);
afterEach(()=>
{
    jest.clearAllMocks();
})

beforeEach(()=> jest.setTimeout(30000));
Enzyme.configure({ adapter: new Adapter() });
describe('Does click play tune and activate highlight', () =>
{
    test('play tune and hightlight', async () =>
    {
        const audio = new Audio('/sound_notes/A.wav');

        const playTune = jest
            .spyOn(window.HTMLMediaElement.prototype, 'play')

        const onClick = jest.fn();
        const order = ["a","b","c","d"]
        render(
            <RoundStartButton value={audio} onClick={onClick} order={order}></RoundStartButton>
        );
        let button = document.getElementsByClassName('roundStart');
        act(()=>{
            userEvent.click(button[0]);
        });

        
        // if click roundStart, play tune and highlight function is called
        expect(playTune).toHaveBeenCalled()
        expect(onClick).toHaveBeenCalled();
    });

    test('click RoundStartButton and timer begins', async () =>
    {
        const audio = new Audio('/sound_notes/A.wav');
        const onClick = jest.fn();
        const order = ["a","b","c","d"]
        const wrapper = mount(<RoundStartButton
            value={audio} onClick={onClick} order={order} />)

        
        render(
            <RoundStartButton value={audio} onClick={onClick} order={order}></RoundStartButton>
        );
        let button = document.getElementsByClassName('roundStart');
        act(()=>{
            userEvent.click(button[0]);
        });

        
        // if click roundStart, timer will start
        setTimeout(() => {
            expect(wrapper.instance().setInterval()).toHaveBeenCalled();

        }, 4000)
    })
})

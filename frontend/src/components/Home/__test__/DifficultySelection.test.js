import {cleanup} from "@testing-library/react";
import DifficultySelection from "../DifficultySelection";
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


afterEach(cleanup);

afterEach(()=>
{
    jest.clearAllMocks();
})

jest.mock("axios")

Enzyme.configure({ adapter: new Adapter() });

describe('Does selection send request', () =>
{
    test('Selection', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();

        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}/>);

        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Beginner', value: 'beginner' });
        });
        
        // If select beginner, it should send 4 notes, duration 2.0 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/4/2.0", {"responseType": "blob"})

    })

    test('Selection', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();

        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}/>);

        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Advanced', value: 'advanced' });
        });
        
        // If select beginner, it should send 5 notes, duration 1.5 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/5/1.5", {"responseType": "blob"})

    })

    test('Selection', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();

        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}/>);

        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Expert', value: 'expert' });
        });
        
        // If select beginner, it should send 6 notes, duration 1.0 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/6/1.0", {"responseType": "blob"})

    })
})
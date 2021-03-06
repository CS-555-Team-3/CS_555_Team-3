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
    test('Selec Beginner', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();
        const setDifficulty = jest.fn();
        const instrument = "piano";
        const  familiar = 0;
        const daily_challenge = 0;

        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}
            SetDifficulty={setDifficulty}
            Instrument={instrument}
            Familiar={familiar}
            DailyChallenge = {daily_challenge}
            />);
        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Beginner', value: 'Beginner' });
        });
        // If select beginner, it should send 4 notes, duration 2.0 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/4/2.0/piano/0/0", {"responseType": "blob"})

    })

    test('Select Advanced', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();
        const setDifficulty = jest.fn();
        const instrument = "piano";
        const  familiar = 0;
        const daily_challenge = 0;

        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}
            SetDifficulty={setDifficulty}
            Instrument={instrument}
            Familiar={familiar}
            DailyChallenge = {daily_challenge}
            />);
        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Advanced', value: 'Advanced' });
        });
        
        // If select beginner, it should send 5 notes, duration 1.5 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/5/1.5/piano/0/0", {"responseType": "blob"})

    })

    test('Select Expert', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();
        const setDifficulty = jest.fn();
        const  familiar = 0;
        const instrument = "piano"
        const daily_challenge = 0;

        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}
            SetDifficulty={setDifficulty}
            Instrument={instrument}
            Familiar={familiar}
            DailyChallenge = {daily_challenge}
            />);
        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Expert', value: 'Expert' });
        });
        
        // If select beginner, it should send 6 notes, duration 1.0 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/6/1.0/piano/0/0", {"responseType": "blob"})

    })



    /* 
        Same tests but this time checks if familar tune correct number of notes is sent back 
    */
    test('Selec Beginner', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();
        const setDifficulty = jest.fn();
        const instrument = "piano";
        const  familiar = 1;
        const daily_challenge = 0;


        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}
            SetDifficulty={setDifficulty}
            Instrument={instrument}
            Familiar={familiar}
            DailyChallenge = {daily_challenge}
            />);
        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Beginner', value: 'Beginner' });
        });
        // If select beginner, it should send 4 notes, duration 2.0 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/4/2.0/piano/1/0", {"responseType": "blob"})

    })

    test('Select Advanced', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();
        const setDifficulty = jest.fn();
        const instrument = "piano";
        const  familiar = 1;
        const daily_challenge = 0;

        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}
            SetDifficulty={setDifficulty}
            Instrument={instrument}
            Familiar={familiar}
            DailyChallenge = {daily_challenge}
            />);
        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Advanced', value: 'Advanced' });
        });
        
        // If select beginner, it should send 5 notes, duration 1.5 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/5/1.5/piano/1/0", {"responseType": "blob"})

    })

    test('Select Expert', async () =>
    {   
        const setAudio = jest.fn();
        const setOrder = jest.fn();
        const setDuration = jest.fn();
        const setDifficulty = jest.fn();
        const instrument = "piano";
        const  familiar = 1;
        const daily_challenge = 0;
        
        const wrapper = mount(<DifficultySelection 
            SetAudio={setAudio} 
            SetOrder={setOrder}
            SetDuration={setDuration}
            SetDifficulty={setDifficulty}
            Instrument={instrument}
            Familiar={familiar}
            DailyChallenge = {daily_challenge}
            />);

        act(()=>
        {
            wrapper.find('Select.Difficulty').instance().selectOption({ label: 'Expert', value: 'Expert' });
        });
        
        // If select beginner, it should send 6 notes, duration 1.0 secs
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/sounds/6/1.0/piano/1/0", {"responseType": "blob"})

    })
})
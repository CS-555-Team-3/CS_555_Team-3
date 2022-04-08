import {cleanup} from "@testing-library/react";
import Settings from "../Settings"
import { act } from 'react-dom/test-utils';
import {mount, shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


afterEach(cleanup);

afterEach(()=>
{
    jest.clearAllMocks();
})


Enzyme.configure({ adapter: new Adapter() });

describe('Does selection and request', () =>
{
    test('Select guitar', async () =>
    {
        const setTimer = jest.fn();
        const setTutorial = jest.fn();
        const setColorblind_mode = jest.fn();
        const setLeaderboard = jest.fn();
        const setInstrument = jest.fn();
        const showSettings = true
        const wrapper = mount(<Settings 
            set_Timer={setTimer}
            set_Tutorial={setTutorial}
            set_Colorblind_mode={setColorblind_mode}
            set_Leaderboard={setLeaderboard}
            SetInstrument={setInstrument}
            showSettings={showSettings}/>);
        
        
        act(()=>
        {
            wrapper.find('Select.Instrument').instance().selectOption({ label: 'Guitar', value: 'guitar' });
        });
        
        expect(setInstrument).toHaveBeenCalled();
    })
})
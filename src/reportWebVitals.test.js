import { shallow } from 'enzyme';
import reportWebVitals from './reportWebVitals';

const wrapper = shallow(<reportWebVitals />);
it('should render reportWebVitals component', () => {   
  expect(wrapper).toMatchSnapshot();
});

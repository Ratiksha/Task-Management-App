import { shallow } from 'enzyme';
import App from './App';

const wrapper = shallow(<App />);
it('should render App component', () => {   
  expect(wrapper).toMatchSnapshot();
});

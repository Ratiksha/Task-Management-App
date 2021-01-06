import { render } from '@testing-library/react';
import TaskBoard from './components/TaskBoard/TaskBoard';

test('renders taskBoard', () => {
  render(<TaskBoard />);
});

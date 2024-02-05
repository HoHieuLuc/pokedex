import { createMeta } from '../../_storybook';
import Navbar from './Navbar';

export default { title: 'Fire Red/Navbar', ...createMeta() };

export const Default = () => {
  return <Navbar>Navbar</Navbar>;
};

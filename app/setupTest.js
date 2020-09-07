import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Mock for react-quill
if (global.document) global.document.getSelection = function() {};

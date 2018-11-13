import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Error from '../Error';

configure({ adapter: new Adapter() });

describe('Error tests', () => {
  it('Page renders', () => {
    //const errors = "Something went wrong.";
    const wrapper = shallow(<Error />).instance();

    console.log(wrapper);
    console.log('hello???');
    expect(true.toBe(false));
  });
});

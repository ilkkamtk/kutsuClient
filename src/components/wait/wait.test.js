import React from 'react';
import { shallow } from 'enzyme';
import Wait from './wait';

describe('<Wait />', () => {
  test('renders', () => {
    const wrapper = shallow(<Wait />);
    expect(wrapper).toMatchSnapshot();
  });
});

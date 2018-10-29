import React from 'react';
import { shallow } from 'enzyme';
import CallForm from './callForm';

describe('<CallForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<CallForm />);
    expect(wrapper).toMatchSnapshot();
  });
});

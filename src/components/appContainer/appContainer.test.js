import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from './appContainer';

describe('<AppContainer />', () => {
  test('renders', () => {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper).toMatchSnapshot();
  });
});

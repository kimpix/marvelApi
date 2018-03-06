import React from 'react';
import Footer from './Footer';


test('Footer render', (props ={}) => {

    const tree = shallow(
      <Footer/>
    );

    expect(tree).toMatchSnapshot();
});

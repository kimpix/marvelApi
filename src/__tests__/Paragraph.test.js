import React from 'react';
import Paragraph from '../Paragraph';


test('Paragraph render', (props ={}) => {

    const tree = shallow(
      <Paragraph content={jest.fn()}/>
    );

    expect(tree).toMatchSnapshot();
});


test('render paragraph content', (props ={}) => {
    const tree = shallow(
      <Paragraph content='Once upon a space'/>
    );

    const paragraphTree = tree.props().children;

    expect(paragraphTree).toEqual('Once upon a space');
});


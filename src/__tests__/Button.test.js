import React from 'react';
import Button from '../Button';


test('Button render', (props ={}) => {

    const tree = shallow(
      <Button onClick={jest.fn()} class={jest.fn()} button={jest.fn()}/>
    );

    expect(tree).toMatchSnapshot();
});


test('render button class', (props ={}) => {
    const tree = shallow(
      <Button onClick={jest.fn()} class='infinite' button={jest.fn()}/>
    );

    const dom = tree.props().className;

    expect(dom).toEqual('infinite');
});


test('render button text', (props ={}) => {
    const tree = shallow(
      <Button onClick={jest.fn()} class={jest.fn()} button='infinite is the way'/>
    );

    const dom = tree.props().children;

    expect(dom).toEqual('infinite is the way');
});


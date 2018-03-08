import React from 'react';
import Link from '../Link';


test('Link render', (props ={}) => {

    const tree = shallow(
      <Link onClick={jest.fn()} href={jest.fn()} textLink={jest.fn()}/>
    );

    expect(tree).toMatchSnapshot();
});


test('render link in a link', (props ={}) => {
    const tree = shallow(
      <Link onClick={jest.fn()} link='#' textLink={jest.fn()}/>
    );

    const paragraphTree = tree.props().href;

    expect(paragraphTree).toEqual('#');
})

test('render paragraph content', (props ={}) => {
    const tree = shallow(
      <Link onClick={jest.fn()} link={jest.fn()}  textLink='Hi ! My name is !'/>
    );

    const paragraphTree = tree.props().children;

    expect(paragraphTree).toEqual('Hi ! My name is !');
});


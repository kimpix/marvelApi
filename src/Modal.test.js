import React from 'react';
import Modal from './Modal';


test('Modal render', (props ={}) => {

    const tree = shallow(
      <Modal containerClassName={jest.fn()} backdropClassName={jest.fn()} isOpen={jest.fn()} onClose={jest.fn()}/>
    );

    expect(tree).toMatchSnapshot();
});


test('Modal containerClass content', (props ={}) => {
    const tree = shallow(
      <Modal containerClassName='Two test are better than once' backdropClassName={jest.fn()} isOpen={jest.fn()} onClose={jest.fn()}/>
    );

    const modalTree = tree.props().className;

    expect(modalTree).toEqual('Two test are better than once');
});


test('Modal backdropClassName content', (props ={}) => {
    const tree = shallow(
      <Modal containerClassName={jest.fn()} backdropClassName='Three test are better than once' isOpen={jest.fn()} onClose={jest.fn()}/>
    );

    const modalTree = render(tree.props().children[1]);

    expect(modalTree[0].attribs.class).toEqual('Three test are better than once');
});



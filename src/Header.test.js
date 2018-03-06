import React from 'react';
import Header from './Header';


test('Header render', (props ={}) => {

    const tree = shallow(
      <Header score={jest.fn()} />
    );

    expect(tree).toMatchSnapshot();
});

test('Header prop render', () => {

    const tree = shallow(
      <Header score='your score : 1  |  computer score: 6'/>
    );

    const dom = tree.props().children[1];


    expect(dom).toEqual(<p className="score">your score : 1  |  computer score: 6</p>);
});


test('Header prop render', () => {

    const tree = shallow(
      <Header score='your score : 3  |  computer score: 7'/>
    );

    const dom = tree.props().children[1];


    expect(dom).toEqual(<p className="score">your score : 3  |  computer score: 7</p>);
});
import React from 'react'
import Board from '../Board'

test('Button render', (props ={}) => {

    const tree = shallow(
      <Board/>
    );

    expect(tree).toMatchSnapshot();
});
  
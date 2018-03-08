import React from 'react';
import FightButton from '../FightingButton';
import sinon from 'sinon';

const TestUtils = require('react-test-utils');

describe('Link', function() {
	test('Element rendering', (props ={}) => {

	    const tree = shallow(
	      <FightButton  randomAdversary={jest.fn()}
	                    class="fight-button random"
	                    button="Random adversary"
	       />
	    );

	    expect(tree).toMatchSnapshot();
	});
});

describe('Button', function() {
	test('is clicked when player two is pending', (props ={}) => {
        const mockRandomAdv = sinon.spy();
        const mockClass = sinon.spy();

	    const tree = mount(
	      <FightButton  
	                    button="Random adversary"
	                    isPlayerTwoPending={true}
	                    isPlayerOnePending={false}
	                    randomAdversary={mockRandomAdv}
	                    classDatas={mockClass}

	       />
	    );

       tree.find('Button').simulate('click');
       expect(mockRandomAdv.calledOnce).toEqual(true);
        
       tree.update();
	   expect(tree.state().className).toEqual('fight-button');
	});
});

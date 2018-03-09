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

describe('Button', function () {
	it('is first time on the board', () => {
        const mockRandomAdv = sinon.spy();

	    const tree = shallow(
	      <FightButton  
	                    isPlayerTwoPending={true}
	                    isPlayerOnePending={false}
	                    randomAdversary={mockRandomAdv}
	                    class
	       />
	    );
       expect(tree.find('Button').props().class).toEqual('fight-button random');      
      // expect(mockRandomAdv.calledOnce).toEqual(true);
	});
});

describe('Button', function () {
	it('is as already been clicked', () => {
        const mockRandomAdv = sinon.spy();

	    const tree = shallow(
	      <FightButton  
	                    isPlayerTwoPending={false}
	                    fight={mockRandomAdv}
	                    class
	       />
	    );
  
      expect(tree.find('Button').props().class).toEqual('fight-button');      
	});
});

describe('Button', function () {
	it('is displayed when player one wins', () => {
        const mockRandomAdv = sinon.spy();

	    const tree = shallow(
	      <FightButton  
	                    isFighting={true}
	                    playAgain={mockRandomAdv}
	                    isPlayerOneTheWinner={true}
	                    class
	       />
	    );
  
      expect(tree.find('Button').props().class).toEqual('fight-button again again--winner');      
	});
});

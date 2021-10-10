import React from 'react';
import Enzyme,{ shallow,mount ,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import RestaurantSignup from '../RestaurantComponent/RestaurantSignup'
import NavComponent from '../SharedComponents/NavComponent';

Enzyme.configure({
    adapter: new Adapter()
});
describe('Customer Profile', () => {
  let wrapper
  beforeAll(()=>{
    wrapper=shallow(<RestaurantSignup  view="unknown"/>)
  })
  it('Check if navbar is present on customerprofile page', () => {
    expect(wrapper.find(NavComponent).exists()).to.equals(true)
  });

  it('Checks for heading Restaurant Registration is presnet', () => {
   expect(wrapper.contains('Restaurant Registration')).to.equal(true) 
  });

  it('Checks for field Country to be not present', () => {
   expect(wrapper.contains('Country')).to.equal(true)
  });

  it('Checks for field Restaurant Name to be present', () => {
   expect(wrapper.contains('Restaurant Name:')).to.equal(true)
  });
});
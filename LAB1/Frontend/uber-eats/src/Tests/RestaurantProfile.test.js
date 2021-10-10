import React from 'react';
import Enzyme,{ shallow,mount ,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import RestaurantProfile from '../RestaurantComponent/RestaurantProfile'
import NavComponent from '../SharedComponents/NavComponent';

Enzyme.configure({
    adapter: new Adapter()
});
describe('Customer Profile', () => {
  let wrapper
  beforeAll(()=>{
    wrapper=shallow(<RestaurantProfile.WrappedComponent  match={{params: {profileId: 1}}}/>)
  })
  it('Check if navbar is present on customerprofile page', () => {
    expect(wrapper.find(NavComponent).exists()).to.equals(true)
  });

  it('Checks for field Restaurant Name is presnet', () => {
   expect(wrapper.contains('Restaurant Name')).to.equal(true) 
  });

  it('Checks for field Address to be not present', () => {
   expect(wrapper.contains('Address')).to.equal(true)
  });

  it('Checks for field City to be present', () => {
   expect(wrapper.contains('City')).to.equal(true)
  });
});
import React from 'react';
import Enzyme,{ shallow,mount ,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import CustomerProfile from '../CustomerComponent/CustomerProfile'
import NavComponent from '../SharedComponents/NavComponent';

Enzyme.configure({
    adapter: new Adapter()
});
describe('Customer Profile', () => {
  let wrapper
  beforeAll(()=>{
    wrapper=shallow(<CustomerProfile.WrappedComponent  match={{params: {custId: 1}}}/>)
  })
  it('Check if navbar is present on customerprofile page', () => {
    expect(wrapper.find(NavComponent).exists()).to.equals(true)
  });

  it('Checks for field First Name', () => {
   expect(wrapper.contains('First Name')).to.equal(true) 
  });

  it('Checks for field sds to be not present', () => {
   expect(wrapper.find('sds').exists()).to.equal(false)
  });

  it('Checks for field Last Name to be present', () => {
   expect(wrapper.contains('Last Name')).to.equal(true)
  });
});
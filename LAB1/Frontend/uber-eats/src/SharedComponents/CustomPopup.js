import React from 'react';
import Modal from 'react-modal';
// import Popup from 'reactjs-popup';

// function CustomPopup() {
//     return (
//         <Popup trigger={<button className="button"> Open Modal </button>} modal>
//         <span> Modal content </span>
//       </Popup>
//     )
// }


// export default CustomPopup
export default class CustomPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
   customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          parentSelector={() => document.querySelector('#modalLanding')}
          style={this.customStyles}
          ariaHideApp={false}
        >

          <select name="deliveryStatus" className="form-control" >
            <option value="orderRecvd">Order Recieved</option>
            <option value="orderPreparing">Preparing</option>
            <option value="pickupReady">Pickup Ready</option>
            <option value="picked up">Picked Up</option>
          </select>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}


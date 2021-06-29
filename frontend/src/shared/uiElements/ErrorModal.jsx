import React from 'react';

import Modal from './modal.component';
import CustomButton from './customButton.component';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<CustomButton  onClick={props.onClear}>Okay</CustomButton>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;

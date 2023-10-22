import Button from '../Button/Button';
import './Modal.css';
import { Modal } from 'react-bootstrap';

const ModalCustom = ({
  show,
  handleClose,
  handleSavechanges,
  modalTitle,
  modalContent,
  size,
  hideButton = false,
  submitText = 'Submit',
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered={true} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      {!hideButton && (
        <Modal.Footer>
          <Button
            text={'Close'}
            type="modal-close-btn"
            onClick={handleClose}
          />
          <Button
            text={submitText}
            type="modal-save-btn submit"
            onClick={handleSavechanges}
          />
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalCustom;

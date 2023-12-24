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
  closeText = 'Close',
  submitText = 'Submit',
  disabled = false,
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
            text={closeText}
            type="modal-close-btn"
            onClick={handleClose}
          />
          <Button
            text={submitText}
            type="modal-save-btn submit"
            onClick={handleSavechanges}
            disabled={disabled}
          />
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalCustom;

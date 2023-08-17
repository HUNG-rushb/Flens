import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
import './Modal.css';
import { Modal } from 'react-bootstrap';

const ModalCustom = ({
  show,
  handleClose,
  handleSavechanges,
  modalTitle,
  modalContent,
  size,
  hideButton = false
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered={true} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      {!hideButton && <Modal.Footer>
        <ButtonCustom
          text={'Close'}
          type="modal-close-btn"
          onClick={handleClose}
        />
        <ButtonCustom
          text="Submit"
          type="modal-save-btn submit"
          onClick={handleSavechanges}
        />
      </Modal.Footer>}
    </Modal>
  );
};

export default ModalCustom;

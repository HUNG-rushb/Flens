import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
// import './Modal.css';
import { Modal } from 'react-bootstrap';

const ModalCustom = ({
  show,
  handleClose,
  modalTitle,
  modalContent,
  size,
  handleSavechanges,
  confirmButtonMessage
}) => {
  return (
    <Modal show={show} onHide={handleClose} size={size} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <ButtonCustom
          text={'Close'}
          type="modal-close-btn"
          onClick={handleClose}
        />
        <ButtonCustom
          text={confirmButtonMessage}
          type="modal-save-btn submit"
          onClick={handleSavechanges}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCustom;

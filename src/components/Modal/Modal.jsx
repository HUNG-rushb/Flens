import { Modal } from 'react-bootstrap';
import ButtonCustom from '../../components/Button/ButtonCustom';

const ModalCustom = ({ show, handleClose, titleText, modalContent, size }) => {
  return (
    <Modal show={show} onHide={handleClose} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{titleText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <ButtonCustom text={'Close'} type="modal-close-btn" onClick={handleClose} />
        <ButtonCustom text={'Save changes'} type="modal-save-btn" onClick={handleClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCustom;

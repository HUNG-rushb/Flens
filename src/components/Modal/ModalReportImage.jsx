import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
import './Modal.css';
import { Modal } from 'react-bootstrap';

const ModalReportImage = ({ image, show, handleClose, handleSavechanges }) => {
  return (
    <Modal show={show} onHide={handleClose} centered={true} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Report Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="report-photo-container">
          <img src={image} alt="" />

          <div className="right-report-photo">
            <span>Report this photo with reason:</span>
            <ul>
              <li>
                <input type="checkbox" /> <span>Copyright infringement</span>{' '}
              </li>
              <li>
                <input type="checkbox" />
                <span>Offensive content </span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Spam</span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Mature content</span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Harmful content</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
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
      </Modal.Footer>
    </Modal>
  );
};

export default ModalReportImage;

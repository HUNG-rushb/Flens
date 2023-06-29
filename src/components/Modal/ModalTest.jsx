import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
import './Modal.css';
import { Modal } from 'react-bootstrap';

const ModalReportImage = ({ item, isShowing, toggle }) => {
  return (
    <Modal show={isShowing} onHide={toggle} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Report Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="report-photo-container">
          <img src='https://images.pexels.com/photos/17040834/pexels-photo-17040834/free-photo-of-anh-sang-th-gian-t-i-mua-dong.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt="" width={'50%'} />

          <div className="left-report-photo">
            <span>Report this photo with reason:</span>
            <ul>
              <li>
                <input type="checkbox" /> <span>Copyright infringement</span>
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
          onClick={toggle}
        />
        <ButtonCustom
          text="Submit"
          type="modal-save-btn submit"
          onClick={toggle}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalReportImage;

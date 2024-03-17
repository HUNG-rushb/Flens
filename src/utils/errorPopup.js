import Button from '../components/Button/Button.jsx';
import Modal from '../components/Modal/Modal.jsx';
import useModal from '../hooks/useModal.jsx';
import { ExclamationCircleFill } from 'react-bootstrap-icons';

const ErrorPopup = ({ message }) => {
  const { isShowing: show, toggle: toggleShow } = useModal();

  const modalContent = () => {
    return (
      <div>
        <ExclamationCircleFill
          size={60}
          color="#f00"
          style={{ alignSelf: 'center', width: '100%' }}
        />
        <p style={{ marginTop: '20px', textAlign: 'center' }}>{message}</p>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button text="close" type="default5" onClick={toggleShow} />
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal
        show={!show}
        modalContent={modalContent()}
        hideButton={true}
        handleClose={toggleShow}
      />
    </>
  );
};

export default ErrorPopup;

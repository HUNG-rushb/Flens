// import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ToastWithLink = ({ notyText, shouldNavigate }) => {
  // const navigate = useNavigate();
  // console.log(window.location.hostname);
  return (
    <div
      onClick={() => {
        if (shouldNavigate)
          // window.open(window.location.hostname + '/notification', '_self');
          window.location.href = '/notification';
        // navigate('/notification');
        else return;
      }}
    >
      {notyText}
    </div>
  );
};

export const successfullNoty = (notyText, shouldNavigate = false) => {
  toast.info(
    <ToastWithLink notyText={notyText} shouldNavigate={shouldNavigate} />,
    {
      position: 'top-right',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    }
  );
};

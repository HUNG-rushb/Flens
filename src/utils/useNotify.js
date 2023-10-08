import { toast } from 'react-toastify';

export const successfullNoty = (notyText) => {
  toast.info(notyText, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

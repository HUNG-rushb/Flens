import { PersonCircle } from 'react-bootstrap-icons';

export const Avatar = ({ size, color, ...props }) => {
  return <PersonCircle size={size} color={color} {...props} />;
};

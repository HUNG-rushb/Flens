import { useAuthState } from '../../context/AuthContext';
import unixToDateTime from '../../utils/unixToDateTime';
import Button from '../Button/Button';
import ActionList from './ActionList';
import './styles.scss';
import { useCallback, useMemo, useState } from 'react';
import {
  GlobeAsiaAustralia,
  PersonFill,
  LockFill,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Header = ({ type = 'post', item, setIsDeleted, setReportedList }) => {
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
  const [postVisibility, setPostVisibility] = useState(item?.postViewStatus);
  const [isHovered, setIsHovered] = useState(false);
  const userLevel = useMemo(() => item?.userLevel || 'New', [item?.userLevel]);

  const handleViewProfile = useCallback(() => {
    navigate(`/profile/${userId}`);
  }, [navigate, userId]);

  const renderPostModeIcon = useCallback(() => {
    if (postVisibility === 'PUBLIC')
      return <GlobeAsiaAustralia size={15} color="#f08080" />;
    else if (postVisibility === 'PRIVATE')
      return <LockFill size={16} color="#f08080" />;
    else return <PersonFill size={18} color="#f08080" />;
  }, [postVisibility]);

  const renderPopoverContent = useCallback(() => {
    return (
      <div className="hover-avatar">
        <div className="hover-content">
          <img
            src={item?.userId.profileImageURL}
            id="avatar-hover"
            width={100}
            height={100}
            onClick={handleViewProfile}
            alt=""
          />
          <div className="left-hover-content">
            <p id="username" onClick={handleViewProfile}>
              {item?.userId.name}
            </p>
            <p>User level: 1</p>
            <p style={{ fontWeight: 600 }}>100 Follower - Hung also followed</p>
            <Button type="default2" text="Chat" />
          </div>
        </div>
      </div>
    );
  }, [handleViewProfile, item?.userId.name, item?.userId.profileImageURL]);

  return useMemo(
    () => (
      <div className="post-header">
        <div className="left-header-wrapper">
          <div
            className="avatar-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={item?.userId.profileImageURL}
              width={60}
              height={60}
              id="avatar"
              alt=""
            />
            {isHovered && renderPopoverContent()}

            <div className="user-level">{userLevel}</div>
          </div>
          <div>
            <span id="username">{item?.userId.name}</span>
            uploaded a {type}
            <div id="date">
              {unixToDateTime(item?.createdAt || '')}
              {renderPostModeIcon()}
            </div>
          </div>
        </div>
        <ActionList
          type={type}
          item={item}
          setIsDeleted={setIsDeleted}
          setPostVisibility={setPostVisibility}
          postVisibility={postVisibility}
          setReportedList={setReportedList}
        />
      </div>
    ),
    [
      type,
      isHovered,
      item,
      postVisibility,
      renderPopoverContent,
      renderPostModeIcon,
      setIsDeleted,
      setReportedList,
      userLevel,
    ]
  );
};

export default Header;
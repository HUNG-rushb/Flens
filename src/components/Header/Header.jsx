import sliceUsername from '../../utils/sliceUsername';
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

const Header = ({
  type = 'post',
  item,
  setIsDeleted,
  setReportedList,
  showDetail = false,
}) => {
  console.log({ item });
  const navigate = useNavigate();
  const [postVisibility, setPostVisibility] = useState(item?.postViewStatus);
  const [isHovered, setIsHovered] = useState(false);
  const userLevel = useMemo(
    () => item?.userId?.level?.currentLevel || 'New',
    [item?.userId?.level?.currentLevel]
  );

  const handleViewProfile = useCallback(() => {
    navigate(`/profile/${item?.userId.id}`);
  }, [item?.userId.id, navigate]);

  const renderPostModeIcon = useCallback(() => {
    if (postVisibility === 'PUBLIC')
      return <GlobeAsiaAustralia size={15} color="#f08080" />;
    else if (postVisibility === 'PRIVATE')
      return <LockFill size={16} color="#f08080" />;
    else return <PersonFill size={18} color="#f08080" />;
  }, [postVisibility]);

  const handleClickChatButton = useCallback(() => {
    navigate('/message');
  }, [navigate]);

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
            <p id="hover-username" onClick={handleViewProfile}>
              {item?.userId.name}
            </p>
            <p>User level: {userLevel}</p>
            {/* <p style={{ fontWeight: 600 }}>100 Follower - Hung also followed</p>
            <Button
              type="default2"
              text="Chat"
              onClick={handleClickChatButton}
            /> */}
          </div>
        </div>
      </div>
    );
  }, [
    handleClickChatButton,
    handleViewProfile,
    item?.userId.name,
    item?.userId.profileImageURL,
  ]);

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
          </div>
          <div>
            <span id="username">
              <b>{sliceUsername(item?.userId.name, 35)}</b> uploaded a {type}
            </span>

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
          showDetail={showDetail}
        />
      </div>
    ),
    [
      item,
      isHovered,
      renderPopoverContent,
      type,
      renderPostModeIcon,
      setIsDeleted,
      postVisibility,
      setReportedList,
      showDetail,
    ]
  );
};

export default Header;

import { useUpdateFollowing } from '../../graphql/useUser';
import ErrorPopup from '../../utils/errorPopup';
import Loading from '../../utils/useLoading';
import './styles.scss';
import { useCallback, useMemo, useState } from 'react';
import { PersonPlusFill, PersonFillCheck } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const SuggestUserItem = ({ item, userId }) => {
  const { updateFollowing, loading, error } = useUpdateFollowing();
  const [isSuccessfullFollow, setIsSuccessfullFollow] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = useCallback(() => {
    navigate(`/profile/${item.node.id}`);
  }, [item.node.id, navigate]);
  
  const handleFollow = useCallback(
    async (followingId) => {
      try {
        await updateFollowing({
          variables: {
            updateFollowingData: {
              userId,
              followingId,
            },
          },
        });
        setIsSuccessfullFollow(true);
      } catch (e) {
        throw e;
      }
    },
    [updateFollowing, userId]
  );
  return useMemo(
    () => (
      <>
        <div className="follow-suggestion" key={item.node.id}>
          <div className="content">
            <div className="content-wrapper" onClick={handleViewProfile}>
              <img
                src={item.node.profileImageURL}
                id="suggestion-image"
                height={50}
                width={50}
                alt=""
              />
              <span id='suggestion-name'>
                {item.node.name}
              </span>
            </div>

            {isSuccessfullFollow ? (
              <PersonFillCheck size={25} color="#f08080" id="add-friend-icon" />
            ) : (
              <PersonPlusFill
                size={25}
                color="#f08080"
                id="add-friend-icon"
                onClick={() => {
                  handleFollow(item.node.id);
                }}
              />
            )}
          </div>
          <hr />
        </div>
        <Loading loading={loading} />
        {error?.message && <ErrorPopup message={error?.message} />}
      </>
    ),
    [
      error?.message,
      handleFollow,
      handleViewProfile,
      isSuccessfullFollow,
      item.node.id,
      item.node.name,
      item.node.profileImageURL,
      loading,
    ]
  );
};

export default SuggestUserItem;

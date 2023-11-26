import { useUpdateFollowing } from '../../../graphql/useUser';
import ErrorPopup from '../../../utils/errorPopup';
import Loading from '../../../utils/useLoading';
import { useCallback, useMemo, useState } from 'react';
import { PersonPlusFill, PersonFillCheck } from 'react-bootstrap-icons';

const FollowUserIcon = (userId, targetUserId) => {
  const { updateFollowing, loading, error } = useUpdateFollowing();
  const [isSuccessfullFollow, setIsSuccessfullFollow] = useState(false);

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
        {isSuccessfullFollow ? (
          <PersonFillCheck size={25} color="#f08080" id="add-friend-icon" />
        ) : (
          <PersonPlusFill
            size={25}
            color="#f08080"
            id="add-friend-icon"
            onClick={() => {
              handleFollow(targetUserId);
            }}
          />
        )}
        <Loading loading={loading} />
        {error?.message && <ErrorPopup message={error?.message} />}
      </>
    ),
    [error?.message, handleFollow, isSuccessfullFollow, loading, targetUserId]
  );
};

export default FollowUserIcon;

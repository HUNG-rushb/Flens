import { useAuthState } from '../../../context/AuthContext';
import { useInteractStory } from '../../../graphql/useStory';
import './styles.scss';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Heart, HeartFill, Reply } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';

const StoryInteraction = ({
  isLiked,
  setIsLiked,
  countNumberOfLikes,
  setCountNumberOfLikes,
}) => {
  const { storyId } = useParams();
  const { id: userId } = useAuthState();
  const [animationWhenClick, setAnimationWhenClick] = useState(false);
  const { interactStory } = useInteractStory();

  const handleLikeStory = useCallback(
    async (event) => {
      event.preventDefault();
      setAnimationWhenClick(true);
      try {
        const a = await interactStory({
          variables: {
            interactStoryData: {
              storyId,
              likedUserId: userId,
              isLiked: !isLiked,
            },
          },
        });
        setIsLiked(!isLiked);
        setCountNumberOfLikes(a.data.interactStory.points);
      } catch (e) {
        throw e;
      }
    },
    [interactStory, isLiked, setCountNumberOfLikes, setIsLiked, storyId, userId]
  );

  useEffect(() => {
    if (animationWhenClick) {
      setTimeout(() => {
        setAnimationWhenClick(false);
      }, 1000);
    }
  }, [animationWhenClick]);

  return useMemo(
    () => (
      <div className="interaction">
        <div className="likes">
          {!isLiked ? (
            <Heart
              size={28}
              onClick={handleLikeStory}
              id={!animationWhenClick ? 'heart-icon' : 'heart-icon-2'}
            />
          ) : (
            <HeartFill
              size={28}
              color="red"
              onClick={handleLikeStory}
              id={!animationWhenClick ? 'heart-icon' : 'heart-icon-2'}
            />
          )}
          <span id="total-likes">{countNumberOfLikes}</span>
        </div>
        <Reply size={28} />
      </div>
    ),
    [animationWhenClick, countNumberOfLikes, handleLikeStory, isLiked]
  );
};

export default StoryInteraction;

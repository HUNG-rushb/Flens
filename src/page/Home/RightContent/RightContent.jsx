import SuggestUserItem from '../../../components/SuggestUserItem/SuggestUserItem';
import { useAuthState } from '../../../context/AuthContext';
import { useGetAllContest } from '../../../graphql/useContest';
import { useSuggestTag } from '../../../graphql/usePost';
import { useSuggestUserToFollow } from '../../../graphql/useUser';
import './styles.scss';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const RightContent = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
  const { fetchedData: suggestedTag } = useSuggestTag();
  const { fetchedData: suggestedUserList } = useSuggestUserToFollow({
    suggestUserToFollowData: { userId },
    limit: 5,
  });
  const { fetchedData: allContests } = useGetAllContest();

  const handleClickContest = useCallback(
    (item) => {
      navigate(`/contest/${item.id}`);
    },
    [navigate]
  );

  const handleClickTag = useCallback(
    async (tag) => {
      navigate(`/tag/${tag}`, {
        state: {
          searchValue: tag,
        },
      });
    },
    [navigate]
  );

  return useMemo(
    () => (
      <div className="right-container">
        <div className="right-content-wrapper">
          <div className="right-content">
            <div className="special-contest">
              <span id="subtitle">Happening Contest:</span>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
              >
                {allContests?.allContests
                  .filter((item) => item.isFinished === false)
                  .map((item, index) => (
                    <SwiperSlide key={index}>
                      <div onClick={() => handleClickContest(item)}>
                        <img
                          src={item.contestImageURL}
                          alt=""
                          id="special-contest-image"
                        />
                        <span id="special-contest-title">
                          {item.name?.substring(0, item?.name.indexOf(':'))}{' '}
                          contest
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>

            <div className="follow-suggestion-container">
              <span id="subtitle">Discover new connections:</span>
              <div className="follow-list-suggestion">
                {suggestedUserList?.suggestUserToFollow.edges.map((item) => (
                  <SuggestUserItem
                    key={item.node.id}
                    item={item}
                    userId={userId}
                  />
                ))}
              </div>
            </div>
            <div className="trending-tags-container">
              <span id="subtitle">Explore tags: </span>
              <div className="tags-list">
                {suggestedTag &&
                  suggestedTag.suggestTags.map((tag, index) => (
                    <div
                      className="tag"
                      key={index}
                      onClick={() => handleClickTag(tag.name)}
                    >
                      #{tag.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [
      allContests?.allContests,
      handleClickContest,
      handleClickTag,
      suggestedTag,
      suggestedUserList?.suggestUserToFollow.edges,
      userId,
    ]
  );
};

export default RightContent;

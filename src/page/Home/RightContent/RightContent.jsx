import { useAuthState } from '../../../context/AuthContext';
import { useGetAllContest } from '../../../graphql/useContest';
import { useSuggestTag } from '../../../graphql/usePost';
import { useSuggestUserToFollow } from '../../../graphql/useUser';
import FollowUserIcon from './FollowUserIcon';
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
  // console.log({ suggestedTag });
  const { fetchedData: suggestedUserList } = useSuggestUserToFollow({
    suggestUserToFollowData: { userId },
    limit: 5,
  });
  // console.log({ suggestedUserList });

  const { fetchedData: allContests } = useGetAllContest();
  // console.log({ allContests });

  const handleClickContest = useCallback(
    (item) => {
      navigate(`/contest/${item.id}`);
    },
    [navigate]
  );

  const handleClickTag = useCallback(
    (tag) => {
      navigate('/explore/inspiration', {
        state: {
          tagValue: tag,
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
                {allContests?.allContests.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div onClick={() => handleClickContest(item)}>
                      <img
                        src={item.contestImageURL}
                        alt=""
                        id="special-contest-image"
                      />
                      <span id="special-contest-title">
                        {item.name?.substring(0, item?.name.indexOf(':'))} contest
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
                  <div className="follow-suggestion" key={item.node.id}>
                    <div className="content">
                      <div
                        className="content-wrapper"
                        onClick={() => {
                          navigate(`/profile/${item.node.id}`);
                        }}
                      >
                        <img
                          src={item.node.profileImageURL}
                          alt=""
                          id="suggestion-image"
                        />
                        <div className="subcontent-wrapper">
                          <span id="sugesstion-name">{item.node.name}</span>
                        </div>
                      </div>
                      <FollowUserIcon
                        userId={userId}
                        targetUserId={item.node.id}
                      />
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            <div className="trending-tags-container">
              <span id="subtitle">Trending tags: </span>
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
      navigate,
      suggestedTag,
      suggestedUserList?.suggestUserToFollow.edges,
      userId,
    ]
  );
};

export default RightContent;

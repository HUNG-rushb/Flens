
import { useAuthState } from '../../../context/AuthContext';
import {
  useSuggestUserToFollow,
  useUpdateFollowing,
  useUnfollowUser,
} from '../../../graphql/useUser';

import { contests } from '../../Contest/Tab/contestData';

import './styles.scss';
import React, { useCallback, useMemo } from 'react';
import { PersonPlusFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

// const followSuggestionList = [
//   {
//     image:
//       'https://images.pexels.com/photos/16024276/pexels-photo-16024276/free-photo-of-dan-ba-hoa-chan-dung-toc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
//     name: 'User 1',
//     type: 'Followed you',
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/13722001/pexels-photo-13722001.jpeg?auto=compress&cs=tinysrgb&w=600',
//     name: 'User 2',
//     type: 'Random',
//   },
//   {
//     image:
//       'https://images.pexels.com/photos/15379284/pexels-photo-15379284/free-photo-of-tr-ng-meo-con-meo-rau-ria.jpeg?auto=compress&cs=tinysrgb&w=600',
//     name: 'User 3',
//     type: 'Random',
//   },
// ];

const tags = [
  'cannon',
  'model',
  'sky',
  'technology',
  'coffee',
  'festival',
  'pet',
  'color',
];

const RightContent = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
  const { fetchedData: suggestedUserList } = useSuggestUserToFollow({
    suggestUserToFollowData: { userId },
  });
  console.log({ suggestedUserList });

  const handleClickContest = useCallback(
    (item) => {
      navigate(`/contest/${item.title}`);
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
                {contests.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div onClick={() => handleClickContest(item)}>
                      <img src={item.image} alt="" id="special-contest-image" />
                      <span id="special-contest-title">
                        {item.title} contest
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="follow-suggestion-container">
              <span id="subtitle">Follow list suggestion:</span>

              <div className="follow-list-suggestion">
                {suggestedUserList?.suggestUserToFollow.map((item) => (
                  <div className="follow-suggestion" key={item.id}>
                    <div className="content">
                      <div
                        className="content-wrapper"
                        onClick={() => {
                          navigate(`/profile/${item.id}`);
                        }}
                      >
                        <img
                          src={item.profileImageURL}
                          alt=""
                          id="suggestion-image"
                        />
                        <div className="subcontent-wrapper">
                          <span id="sugesstion-name">{item.name}</span>
                          {/* <span id="sugesstion-type">{item.type}</span> */}
                        </div>
                      </div>

                      <PersonPlusFill
                        size={25}
                        color="#f08080"
                        id="add-friend-icon"
                        onClick={() => {}}
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
                {tags.map((tag, index) => (
                  <div className="tag" key={index}>
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [handleClickContest, suggestedUserList]
  );
};

export default RightContent;

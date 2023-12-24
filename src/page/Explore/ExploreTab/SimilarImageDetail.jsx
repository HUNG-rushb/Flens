import Spinner from '../../../components/utils/Spinner';
import { useGetSimilarPost } from '../../../graphql/usePost';
import ErrorPopup from '../../../utils/errorPopup';
import './styles.scss';
import React, { useMemo } from 'react';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const SimilarImageDetail = ({ imageDetail, setImageToShow }) => {
  const {
    posts: similarPosts,
    isFetching,
    error,
  } = useGetSimilarPost({
    data: { postId: imageDetail.id },
  });
  console.log({ similarPosts });

  return useMemo(
    () => (
      <>
        <div className="similar-explore-container">
          <div className="header">
            <img
              src={imageDetail.userId.profileImageURL}
              id="user-avatar"
              height={50}
              width={50}
              alt=""
            />
            <span id="username">{imageDetail.userId.name}</span>
          </div>
          <div className="main-image">
            <img src={imageDetail.image.url} alt="" />
          </div>
          <hr />
          <div className="similar-images-list">
            <span style={{ fontWeight: 600, fontSize: 25 }}>Similar image</span>

            {isFetching ? (
              <Spinner />
            ) : (
              <div>
                <Swiper
                  slidesPerView={2}
                  spaceBetween={30}
                  className="images-list"
                >
                  {similarPosts.map((item) => (
                    <SwiperSlide key={item.node.id}>
                      <img
                        src={item.node.image.url}
                        onClick={() => setImageToShow(item.node)}
                        style={{
                          maxHeight: 200,
                          objectFit: 'cover',
                          width: '100%',
                          cursor: 'pointer',
                        }}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
        {error?.message && <ErrorPopup message={error?.message} />}
      </>
    ),
    [
      error?.message,
      imageDetail.image.url,
      imageDetail.userId.name,
      imageDetail.userId.profileImageURL,
      isFetching,
      setImageToShow,
      similarPosts,
    ]
  );
};

export default SimilarImageDetail;

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
    loading,
    error,
  } = useGetSimilarPost({
    data: { postId: imageDetail.id },
  });
  console.log({ similarPosts });

  return useMemo(
    () => (
      <>
        <div className="container">
          <div className="header">
            <img
              src={imageDetail.userId.profileImageURL}
              alt=""
              id="user-avatar"
            />
            <span id="username">{imageDetail.userId.name}</span>
          </div>
          <div className="main-image">
            <img src={imageDetail.image.url} alt="" />
          </div>

          <hr />

          <div className="similar-images-list">
            <span>Similar image</span>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  className="images-list"
                >
                  {similarPosts.map((item) => (
                    <SwiperSlide key={item.node.id} className="image-item">
                      <img
                        src={item.node.image.url}
                        alt=""
                        onClick={() => setImageToShow(item.node)}
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
      loading,
      setImageToShow,
      similarPosts,
    ]
  );
};

export default SimilarImageDetail;

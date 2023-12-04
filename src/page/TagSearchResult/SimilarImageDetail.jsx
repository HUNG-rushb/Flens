import Spinner from '../../components/utils/Spinner';
import { useGetSimilarPost } from '../../graphql/usePost';
import ErrorPopup from '../../utils/errorPopup';
import './styles.scss';
import React, { useMemo } from 'react';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const SimilarImageDetail = ({ imageDetail, setSelectedItem }) => {
  console.log(imageDetail, 'cốnle');
  const {
    posts: similarPosts,
    isFetching,
    fetchError,
  } = useGetSimilarPost({
    data: { postId: imageDetail.id },
  });
  return useMemo(
    () => (
      <>
        <div className="container">
          <div className="header">
            <img src={imageDetail.avatar} alt="" id="user-avatar" />
            <span id="username">{imageDetail.username}</span>
          </div>
          <div className="main-image">
            <img
              src={imageDetail.image.url}
              alt=""
              style={{
                maxWidth: '800px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <hr />
          <div className="similar-images-list">
            <span style={{ fontWeight: 600 }}>Similar image</span>
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
                    <SwiperSlide key={item.node.id} className="image-item">
                      <img
                        src={item.node.image.url}
                        onClick={() => setSelectedItem(item.node)}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
        {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
      </>
    ),
    [
      fetchError?.message,
      imageDetail.avatar,
      imageDetail.image.url,
      imageDetail.username,
      isFetching,
      setSelectedItem,
      similarPosts,
    ]
  );
};

export default SimilarImageDetail;

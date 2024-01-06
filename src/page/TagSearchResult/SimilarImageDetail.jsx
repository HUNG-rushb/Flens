import Spinner from '../../components/utils/Spinner';
import { useGetSimilarPost, usePostInfo } from '../../graphql/usePost';
import ErrorPopup from '../../utils/errorPopup';
import './styles.scss';
import React, { useMemo } from 'react';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const SimilarImageDetail = ({ selectedItem, setSelectedItem }) => {
  const { fetchedData: postInfor } = usePostInfo({
    postInfoData: selectedItem.id,
  });
  console.log(selectedItem.id)
  const {
    posts: similarPosts,
    isFetching,
    fetchError,
  } = useGetSimilarPost({
    data: { postId: selectedItem.id },
  });
  return useMemo(
    () => (
      <>
        <div className="similar-container">
          <div className="header">
            <img src={selectedItem.avatar} alt="" id="user-avatar" />
            <span id="username">{selectedItem.username}</span>
          </div>
          <div className="main-image">
            <img
              src={selectedItem.image.url}
              alt=""
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <hr />
          <div className="similar-images-list">
            <span style={{ fontWeight: 600, fontSize: 25 }}>Similar image</span>
            {isFetching ? (
              <Spinner />
            ) : (
              <div>
                <Swiper slidesPerView={2} spaceBetween={30}>
                  {similarPosts.map((item) => (
                    <SwiperSlide key={item.node.id}>
                      <img
                        src={item.node.image.url}
                        onClick={() => setSelectedItem(item.node)}
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
        {fetchError?.message && <ErrorPopup message={fetchError?.message} />}
      </>
    ),
    [
      fetchError?.message,
      selectedItem.avatar,
      selectedItem.image.url,
      selectedItem.username,
      isFetching,
      setSelectedItem,
      similarPosts,
    ]
  );
};

export default SimilarImageDetail;

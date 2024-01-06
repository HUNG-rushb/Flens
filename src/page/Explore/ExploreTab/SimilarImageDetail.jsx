import Spinner from '../../../components/utils/Spinner';
import { useGetSimilarPost, usePostInfo } from '../../../graphql/usePost';
import ErrorPopup from '../../../utils/errorPopup';
import ImageDetail from '../../Home/Post/ImageDetail';
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

  const { fetchedData: postInfor } = usePostInfo({
    postInfoData: { postId: imageDetail?.id },
  });

  return useMemo(
    () => (
      <>
        <div className="similar-explore-container">
          <ImageDetail item={postInfor?.postInfo} />
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
      isFetching,
      postInfor?.postInfo,
      setImageToShow,
      similarPosts,
    ]
  );
};

export default SimilarImageDetail;

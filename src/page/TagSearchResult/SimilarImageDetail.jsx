import { allImagesList } from '../Explore/ImageData';
import './styles.scss';
import React, { useMemo } from 'react';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const SimilarImageDetail = ({ imageDetail }) => {
  return useMemo(
    () => (
      <div className="container">
        <div className="header">
          <img src={imageDetail.avatar} alt="" id="user-avatar" />
          <span id="username">{imageDetail.username}</span>
        </div>
        <div className="main-image">
          <img src={imageDetail.image} alt="" />
        </div>
        <hr />
        <div className="similar-images-list">
          <span>Similar image</span>
          <div>
            <Swiper slidesPerView={4} spaceBetween={30} className="images-list">
              {allImagesList.map((item) => (
                <SwiperSlide key={item.id} className="image-item">
                  <img src={item.image} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    ),
    [imageDetail.avatar, imageDetail.image, imageDetail.username]
  );
};

export default SimilarImageDetail;

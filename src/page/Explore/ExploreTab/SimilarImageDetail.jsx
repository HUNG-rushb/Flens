import './ExploreTab.css';
import React, { useMemo } from 'react';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const allImagesList = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/15976900/pexels-photo-15976900/free-photo-of-mua-xuan-la-hoa-dong-c-a.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/17005370/pexels-photo-17005370/free-photo-of-l-nh-tuy-t-g-binh-minh.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/16958120/pexels-photo-16958120/free-photo-of-thanh-ph-ngh-thu-t-d-cu-ki-n-truc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/17211653/pexels-photo-17211653/free-photo-of-ki-n-truc-london-notting-hill-mews.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/15030610/pexels-photo-15030610/free-photo-of-mua-he-d-o-k-l-ao.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/17031087/pexels-photo-17031087/free-photo-of-g-chim-thu-v-t-m.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 7,
    image:
      'https://images.pexels.com/photos/16931198/pexels-photo-16931198/free-photo-of-g-thanh-ph-phong-c-nh-thien-nhien.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 8,
    image:
      'https://images.pexels.com/photos/16848567/pexels-photo-16848567/free-photo-of-g-phong-c-nh-n-c-nui.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
  {
    id: 9,
    image:
      'https://images.pexels.com/photos/16158164/pexels-photo-16158164/free-photo-of-thien-nhien-th-i-trang-kinh-ram-nh-ng-ng-i.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
  },
];

const SimilarImageDetail = ({ imageDetail }) => {
  return useMemo(
    () => (
      <div className="similar-image-detail-container">
        <div className="similar-image-detail-content">
          <div className="similar-image-detail-header">
            <div>
              <img
                src={imageDetail.avatar}
                alt=""
                id="similar-image-detail-avatar"
              />
            </div>
            <span id="similar-image-detail-username">
              {imageDetail.username}
            </span>
          </div>
          <div className="similar-image-detail-main-image">
            <img src={imageDetail.image} alt="" />
          </div>
          <hr />
          <div className="similar-image-list-part">
            <span>Similar image</span>
            <div>
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                className="similar-image-list"
              >
                {allImagesList.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className="similar-image-list-item"
                  >
                    <img src={item.image} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    ),
    [imageDetail.avatar, imageDetail.image, imageDetail.username]
  );
};

export default SimilarImageDetail;

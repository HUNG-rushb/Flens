import VideoCourses1 from '../../assets/images/academy/videoCourses1.png';
import VideoCourses2 from '../../assets/images/academy/videoCourses2.png';
import Page from '../../components/utils/Page.js';
import './Message.css';
import React, { Suspense } from 'react';
import { FreeMode, Pagination } from 'swiper';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const video_courses_data = [
  {
    id: 1,
    image: VideoCourses1,
    title: 'Helmut Newton MasterClass',
  },
  {
    id: 2,
    image: VideoCourses2,
    title: 'Willy Ronis MasterClass',
  },
  {
    id: 1,
    image: VideoCourses1,
    title: 'Helmut Newton MasterClass',
  },
  {
    id: 2,
    image: VideoCourses2,
    title: 'Willy Ronis MasterClass',
  },
  {
    id: 1,
    image: VideoCourses1,
    title: 'Helmut Newton MasterClass',
  },
  {
    id: 2,
    image: VideoCourses2,
    title: 'Willy Ronis MasterClass',
  },
  {
    id: 1,
    image: VideoCourses1,
    title: 'Helmut Newton MasterClass',
  },
  {
    id: 2,
    image: VideoCourses2,
    title: 'Willy Ronis MasterClass',
  },
];

const MessagePage = () => {
  return (
    <Page title="Flens-Message">
      <Suspense fallback={null}>
        <div className="message-page">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {video_courses_data.map((item) => (
              <SwiperSlide key={item.id}>
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Suspense>
    </Page>
  );
};

export default MessagePage;

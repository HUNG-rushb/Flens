import Workshop1 from '../../../assets/images/academy/workshop1.png';
import Workshop2 from '../../../assets/images/academy/workshop2.png';
import Workshop3 from '../../../assets/images/academy/workshop3.png';
import React from 'react';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const workshop_data = [
  {
    id: 1,
    image: Workshop1,
    title: 'Mosaic Art Workshop',
  },
  {
    id: 2,
    image: Workshop2,
    title: 'Art Macrame Workshop',
  },
  {
    id: 3,
    image: Workshop3,
    title: 'Meow pottery Workshop',
  },
  {
    id: 4,
    image: Workshop1,
    title: 'Mosaic Art Workshop',
  },
  {
    id: 5,
    image: Workshop2,
    title: 'Art Macrame Workshop',
  },
  {
    id: 6,
    image: Workshop3,
    title: 'Meow pottery Workshop',
  },
];

const Workshop = () => {
  return (
    <div className="workshop-component">
      <span className="academy-section-tittle">Workshop</span>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        className="workshop-courses-list"
      >
        {workshop_data.map((item) => (
          <SwiperSlide key={item.id} className='workshop-courses-item'>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Workshop;

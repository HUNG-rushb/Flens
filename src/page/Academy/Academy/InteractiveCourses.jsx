import InteractiveCourses1 from '../../../assets/images/academy/interCourses1.png';
import InteractiveCourses2 from '../../../assets/images/academy/interCourses2.png';
import InteractiveCourses3 from '../../../assets/images/academy/interCourses3.png';
import InteractiveCourses4 from '../../../assets/images/academy/interCourses4.png';
import React from 'react';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const interactive_courses_data = [
  {
    id: 1,
    image: InteractiveCourses1,
    title: 'Basics of Photography',
  },
  {
    id: 2,
    image: InteractiveCourses2,
    title: 'Shutter Speed',
  },
  {
    id: 3,
    image: InteractiveCourses3,
    title: 'Basic composition',
  },
  {
    id: 4,
    image: InteractiveCourses4,
    title: 'Light',
  },
  {
    id: 5,
    image: InteractiveCourses1,
    title: 'Basics of Photography',
  },
  {
    id: 6,
    image: InteractiveCourses2,
    title: 'Shutter Speed',
  },
  {
    id: 7,
    image: InteractiveCourses3,
    title: 'Basic composition',
  },
  {
    id: 8,
    image: InteractiveCourses4,
    title: 'Light',
  }
];

const InteractiveCourses = () => {
  return (
    <div className="interactive-courses-component">
      <span className="academy-section-tittle">interactive video Courses</span>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="interactive-courses-list"
      >
        {interactive_courses_data.map((item) => (
          <SwiperSlide key={item.id} className='interactive-courses-item'>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
  );
};

export default InteractiveCourses;

// import VideoCourses1 from '../../../assets/images/academy/videoCourses1.png';
// import VideoCourses2 from '../../../assets/images/academy/videoCourses2.png';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.min.css';

// const video_courses_data = [
//   {
//     id: 1,
//     image: VideoCourses1,
//     title: 'Helmut Newton MasterClass',
//   },
//   {
//     id: 2,
//     image: VideoCourses2,
//     title: 'Willy Ronis MasterClass',
//   },
//   {
//     id: 3,
//     image: VideoCourses1,
//     title: 'Helmut Newton MasterClass',
//   },
//   {
//     id: 4,
//     image: VideoCourses2,
//     title: 'Willy Ronis MasterClass',
//   },
//   {
//     id: 5,
//     image: VideoCourses1,
//     title: 'Helmut Newton MasterClass',
//   },
//   {
//     id: 6,
//     image: VideoCourses2,
//     title: 'Willy Ronis MasterClass',
//   },
//   {
//     id: 7,
//     image: VideoCourses1,
//     title: 'Helmut Newton MasterClass',
//   },
//   {
//     id: 8,
//     image: VideoCourses2,
//     title: 'Willy Ronis MasterClass',
//   },
// ];

// const VideoCourses = () => {
//   const navigate = useNavigate();

//   const handleCLickOpenCourses = (title) => {
//     navigate(`/academy/videoCourses/${title.split(' ').join('')}`);
//   };
//   return (
//     <div className="video-courses-component">
//       <span id="academy-section-tittle">Video Courses</span>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={30}
//         className="video-courses-list"
//       >
//         {video_courses_data.map((item) => (
//           <SwiperSlide
//             key={item.id}
//             className="video-courses-item"
//             onClick={() => handleCLickOpenCourses(item.title)}
//           >
//             <img src={item.image} alt={item.title} />
//             <span>{item.title}</span>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default VideoCourses;

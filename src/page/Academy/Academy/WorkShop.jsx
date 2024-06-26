// import Workshop1 from '../../../assets/images/academy/workshop1.png';
// import Workshop2 from '../../../assets/images/academy/workshop2.png';
// import Workshop3 from '../../../assets/images/academy/workshop3.png';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.min.css';

// const workshop_data = [
//   {
//     id: 1,
//     image: Workshop1,
//     title: 'Mosaic Art Workshop',
//   },
//   {
//     id: 2,
//     image: Workshop2,
//     title: 'Art Macrame Workshop',
//   },
//   {
//     id: 3,
//     image: Workshop3,
//     title: 'Meow pottery Workshop',
//   },
//   {
//     id: 4,
//     image: Workshop1,
//     title: 'Mosaic Art Workshop',
//   },
//   {
//     id: 5,
//     image: Workshop2,
//     title: 'Art Macrame Workshop',
//   },
//   {
//     id: 6,
//     image: Workshop3,
//     title: 'Meow pottery Workshop',
//   },
// ];

// const Workshop = () => {
//   const navigate = useNavigate();

//   const handleCLickOpenCourses = (title) => {
//     navigate(`/academy/workshop/${title.split(' ').join('')}`);
//   };
//   return (
//     <div className="workshop-component">
//       <span id="academy-section-tittle">Workshop</span>
//       <Swiper
//         slidesPerView={3}
//         spaceBetween={30}
//         className="workshop-courses-list"
//       >
//         {workshop_data.map((item) => (
//           <SwiperSlide
//             key={item.id}
//             className="workshop-courses-item"
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

// export default Workshop;

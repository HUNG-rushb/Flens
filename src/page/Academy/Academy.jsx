import InteractiveCourses1 from '../../assets/images/academy/interCourses1.png';
import InteractiveCourses2 from '../../assets/images/academy/interCourses2.png';
import InteractiveCourses3 from '../../assets/images/academy/interCourses3.png';
import InteractiveCourses4 from '../../assets/images/academy/interCourses4.png';
import VideoCourses1 from '../../assets/images/academy/videoCourses1.png';
import VideoCourses2 from '../../assets/images/academy/videoCourses2.png';
import Workshop1 from '../../assets/images/academy/workshop1.png';
import Workshop2 from '../../assets/images/academy/workshop2.png';
import Workshop3 from '../../assets/images/academy/workshop3.png';
import Page from '../../components/utils/Page';
import './Academy.css';
import React, { Suspense } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const Academy = () => {
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
  ];

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
  ];

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
  ];
  return (
    <Page title={'Flens-Academy'}>
      <Suspense fallback={null}>
        <div className="academy">
          <div className="academy-title-page">
            <span>For success in photography</span>
            <p>
              At FLENS academy you will find all you need to take the next step
              in photography. We have both beginner courses, master class videos
              and workshops, always striving to meet your curiosity. If you want
              to improve your current photography skills, you may want to try
              ours course deeply.
            </p>
          </div>
          <div className="academy-body-page">
            <div className="video-courses">
              <div className="name-part">
                <span>Video Courses</span>
                <span>Show all</span>
              </div>

              <div className="video-courses-body">
                {video_courses_data.map((item) => {
                  return (
                    <div key={item.id}>
                      <img
                        src={item.image}
                        alt="videoCourses"
                        width={500}
                      ></img>
                      <span>{item.title}</span>
                    </div>
                  );
                })}
                {video_courses_data.length > 1 ? (
                  <div className="next-button">
                    <ArrowRightCircle size={30} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="interactive-courses">
              <div className="name-part">
                <span>Interactive Courses</span>
                <span>Show all</span>
              </div>
              <div className="interactive-body-part">
                {interactive_courses_data.map((item) => {
                  return (
                    <div key={item.id}>
                      <img
                        src={item.image}
                        alt="interactiveCourses4"
                        height={350}
                      ></img>
                      <span>{item.title}</span>
                    </div>
                  );
                })}
                {interactive_courses_data.length > 3 ? (
                  <div className="next-button">
                    <ArrowRightCircle size={30} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="work-shop">
              <div className="name-part">
                <span>Workshop</span>
                <span>Show all</span>
              </div>
              <div className="workshop-body-part">
                {workshop_data.map((item) => {
                  return (
                    <div key={item.id}>
                      <img src={item.image} alt="workshop" height={300}></img>
                      <span>{item.title}</span>
                    </div>
                  );
                })}
                {workshop_data.length > 2 ? (
                  <div className="next-button">
                    <ArrowRightCircle size={30} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Academy;

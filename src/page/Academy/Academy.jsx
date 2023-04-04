import InteractiveCourses1 from '../../assets/images/academy/interCourses1.png';
import InteractiveCourses2 from '../../assets/images/academy/interCourses2.png';
import InteractiveCourses3 from '../../assets/images/academy/interCourses3.png';
import InteractiveCourses4 from '../../assets/images/academy/interCourses4.png';
import VideoCourses1 from '../../assets/images/academy/videoCourses1.png';
import VideoCourses2 from '../../assets/images/academy/videoCourses2.png';
import Workshop1 from '../../assets/images/academy/workshop1.png'
import Workshop2 from '../../assets/images/academy/workshop2.png'
import Workshop3 from '../../assets/images/academy/workshop3.png'

import Page from '../../components/utils/Page';
import './Academy.css';
import React, { Suspense } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const Academy = () => {
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
                <div>
                  <img src={VideoCourses1} alt="videoCourses" width={500}></img>
                  <span>Helmut Newton MasterClass</span>
                </div>
                <div>
                  <img src={VideoCourses2} alt="videoCourses" width={500}></img>
                  <span>Willy Ronis MasterClass</span>
                </div>
                <div className="next-button">
                  <ArrowRightCircle size={30} />
                </div>
              </div>
            </div>

            <div className="interactive-courses">
              <div className="name-part">
                <span>Interactive Courses</span>
                <span>Show all</span>
              </div>
              <div className="interactive-body-part">
                <div>
                  <img
                    src={InteractiveCourses1}
                    alt="interactiveCourses1"
                    height={350}
                  ></img>
                  <span>Basics of Photography</span>
                </div>
                <div>
                  <img
                    src={InteractiveCourses2}
                    alt="interactiveCourses2"
                    height={350}
                  ></img>
                  <span>Shutter Speed</span>
                </div>
                <div>
                  <img
                    src={InteractiveCourses3}
                    alt="interactiveCourses3"
                    height={350}
                  ></img>
                  <span>Basic composition</span>
                </div>
                <div>
                  <img
                    src={InteractiveCourses4}
                    alt="interactiveCourses4"
                    height={350}
                  ></img>
                  <span>Light</span>
                </div>
                <div className="next-button">
                  <ArrowRightCircle size={30} />
                </div>
              </div>
            </div>

            <div className="work-shop">
              <div className="name-part">
                <span>Workshop</span>
                <span>Show all</span>
              </div>
              <div className="workshop-body-part">
                <div>
                  <img src={Workshop1} alt="workshop" width={300}></img>
                  <span>Mosaic Art Workshop</span>
                </div>
                <div>
                  <img src={Workshop2} alt="workshop" width={400}></img>
                  <span>Art Macrame Workshop</span>
                </div>
                <div>
                  <img src={Workshop3} alt="workshop" width={300}></img>
                  <span>Meow pottery Workshop</span>
                </div>
                <div className="next-button">
                  <ArrowRightCircle size={30} />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default Academy;

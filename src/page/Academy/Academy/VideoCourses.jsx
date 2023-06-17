import VideoCourses1 from '../../../assets/images/academy/videoCourses1.png';
import VideoCourses2 from '../../../assets/images/academy/videoCourses2.png';
import { ArrowRightCircle } from 'react-bootstrap-icons';

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

const VideoCourses = () => {
  return (
    <div className="video-courses">
      <div className="name-part">
        <span>Video Courses</span>
        <span>Show all</span>
      </div>

      <div className="video-courses-body">
        {video_courses_data.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.image} alt="videoCourses" width={500} />
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
  );
};

export default VideoCourses;

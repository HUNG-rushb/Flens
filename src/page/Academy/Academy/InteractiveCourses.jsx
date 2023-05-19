import InteractiveCourses1 from '../../../assets/images/academy/interCourses1.png';
import InteractiveCourses2 from '../../../assets/images/academy/interCourses2.png';
import InteractiveCourses3 from '../../../assets/images/academy/interCourses3.png';
import InteractiveCourses4 from '../../../assets/images/academy/interCourses4.png';
import { ArrowRightCircle } from 'react-bootstrap-icons';

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

const InteractiveCourses = () => {
  return (
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
  );
};

export default InteractiveCourses;

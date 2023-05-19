import Workshop1 from '../../../assets/images/academy/workshop1.png';
import Workshop2 from '../../../assets/images/academy/workshop2.png';
import Workshop3 from '../../../assets/images/academy/workshop3.png';
import { ArrowRightCircle } from 'react-bootstrap-icons';

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

const Workshop = () => {
  return (
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
  );
};

export default Workshop;

import Avatar from '../../assets/images/avatar.jpg';

const LeftHomeContent = () => {
  return <div className="container-left-content">
    <div className="left-content">
      <img src={Avatar} alt="avatar"/>
      <div className="name">Nguyen Van A</div>
      <div className="skill-content">
        <div>
          <span>Your Flens link:</span> flens.com/quocthanhh
        </div>
        <div>
          <span>Favourites:</span> Camera, Portrait
        </div>
        <div>
          <span>Skills:</span> Portrait photography
        </div>
      </div>
    </div>
  </div>;
};

export default LeftHomeContent;

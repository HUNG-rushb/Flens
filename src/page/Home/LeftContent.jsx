import Avatar from '../../assets/images/avatar.jpg';

const LeftHomeContent = () => {
    return <div className="left-content">
    <img src={Avatar} alt="avatar"></img>
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
}

export default LeftHomeContent;
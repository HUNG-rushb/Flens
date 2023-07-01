import React from 'react';

const previousWinner = [
  {
    image:
      'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600',
    avatar:
      'https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'username',
    contestTitle: 'Flower',
    comment:
      'We are happy to announce username as the winner of our Flower contest! Take a look at the photograph "Flower in the field" capturing the true spirit of photography.',
  },
];

const PreviousWinner = () => {
  return (
    <div className="previous-winner-container">
      <div className="previous-winner-posts">
        <div className="previous-winner-post">
          <div className="previous-winner-post-image">
            <img id='winner-post-image' src={previousWinner[0].image} alt="" />
            <div >
              <img id='winner-post-avatar' src={previousWinner[0].avatar} alt="" />
              <span id="winner-name">{previousWinner[0].name}</span>
            </div>
          </div>
          <div className="previous-winner-post-content">
            <div className="winner-post-title">{previousWinner[0].contestTitle} contest winner</div>
            <p>
              {previousWinner[0].comment}
            </p>
          </div>
        </div>
        
        <div className="previous-winner-post">
          <div className="previous-winner-post-image">
            <img src={previousWinner[0].image} alt="" />
            <div >
              <img src={previousWinner[0].avatar} alt="" />
              <span id="winner-name">{previousWinner[0].name}</span>
            </div>
          </div>
          <div className="previous-winner-post-content">
            <div className="winner-post-title">{previousWinner[0].contestTitle} contest winner</div>
            <p>
              {previousWinner[0].comment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousWinner;

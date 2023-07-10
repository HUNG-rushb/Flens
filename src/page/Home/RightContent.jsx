import React from 'react';
import { PersonPlusFill } from 'react-bootstrap-icons';

const followSuggestionList = [
  {
    image:
      'https://images.pexels.com/photos/16024276/pexels-photo-16024276/free-photo-of-dan-ba-hoa-chan-dung-toc.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    name: 'User 1',
    type: 'Followed you',
  },
  {
    image:
      'https://images.pexels.com/photos/13722001/pexels-photo-13722001.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'User 2',
    type: 'Random',
  },
  {
    image:
      'https://images.pexels.com/photos/15379284/pexels-photo-15379284/free-photo-of-tr-ng-meo-con-meo-rau-ria.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'User 3',
    type: 'Random',
  },
];

const tags = [
  'cannon',
  'model',
  'sky',
  'technology',
  'coffee',
  'festival',
  'pet',
  'color',
];

const RightContent = () => {
  return (
    <div className="homepage-right-container">
      <div className="homepage-right-content">
        <div className="special-contest">
          <span id="home-right-content-subtitle">Happening Contest:</span>
          <div className="special-contest-detail">
            <img
              src="https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              id="special-contest-image"
            />
            <span id="special-contest-title">Flowers contest</span>
          </div>
          <hr />
        </div>
        <div className="follow-suggestion-container">
          <span id="home-right-content-subtitle">Follow list suggestion:</span>
          <div className="follow-list-suggestion">
            {followSuggestionList.map((item, index) => (
              <div className="follow-suggestion" key={index}>
                <div className="follow-suggestion-content">
                  <div className="follow-suggestion-avatar-name">
                    <img src={item.image} alt="" id="follow-suggestion-image" />
                    <div className="follow-suggestion-name-an-type">
                      <span id="follow-sugesstion-name">{item.name}</span>
                      <span id="follow-sugesstion-type">{item.type}</span>
                    </div>
                  </div>
                  <PersonPlusFill size={25} color='#f08080' id='follow-suggestion-list-add-icon' />
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
        <div className="trending-tags-container">
          <span id="home-right-content-subtitle">Trending tags: </span>
          <div className="trending-tags">
            {tags.map((tag, index) => (
              <div className="trending-tag" key={index}>
                #{tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContent;

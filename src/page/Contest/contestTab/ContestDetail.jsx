import './ContestDetail.css';
import React, { useRef, useState } from 'react';

const birthdayContest = {
  title: 'birthday',
  image:
    'https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg?auto=compress&cs=tinysrgb&w=600',
  description: `Calling all birthday enthusiasts! Join us for the most exciting contest of the year - the Birthday Bash Contest! It's time to share your unforgettable birthday moments and make them shine. Whether it's a hilarious party prank, a heartwarming surprise, or a picture-perfect cake, we want to hear all about it. Dust off those photo albums, dig through your camera roll, or put your storytelling skills to the test. From the hilarious mishaps to the heartwarming memories, we're here to celebrate the joyous occasions that birthdays bring. Enter your best birthday stories, photos, or videos for a chance to win fabulous prizes. Get ready to blow out the candles and make this birthday contest one for the ages!`,
  startDate: 'July 1, 2023.',
  endDate: 'July 31, 2023.',
  prizes: [
    { rank: '1st', prize: '$500 gift card + Birthday party package.' },
    { rank: '2nd', prize: '$300 gift card + Personalized birthday cake.' },
    { rank: '3rd', prize: '$200 gift card + Birthday surprise box.' },
  ],
  uploader: 'John wick',
};

const ContestDetail = () => {
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="contest-detail-page">
      <div className="contest-detail-header">
        <div className="contest-detail-banner">
          <img src={birthdayContest.image} alt="" />
        </div>
        <div className="contest-detail-title">
          {birthdayContest.title} competition
        </div>
      </div>

      <div className="contest-detail-content">
        <div className="contest-detail-description">
          <span id="contest-subtitle">Description</span>
          <p>{birthdayContest.description}</p>
        </div>
        <div className="contest-detail-date">
          <span id="contest-subtitle">Deadline</span>
          <div>
            <span>Start date:</span>
            {birthdayContest.startDate}
          </div>
          <div>
            <span>End date:</span>
            {birthdayContest.endDate}
          </div>
        </div>
        <div className="contest-detail-prizes">
          <span id="contest-subtitle">Prizes</span>
          <ul>
            {birthdayContest.prizes.map((prize, index) => (
              <li key={index}>
                {prize.rank} - {prize.prize}
              </li>
            ))}
          </ul>
        </div>
        <div className="contest-detail-uploader">
          <span id="contest-subtitle">Uploader</span>
          <p>Mr/Ms. {birthdayContest.uploader}</p>
        </div>
        <div className="contest-detail-submit">
          <span id="contest-subtitle">Submition</span>
          <div>
            <div className="contest-submit-box">
              <div className="contest-submit-content">
                <div>
                  <label>Full name</label>
                  <input type="text" placeholder="Enter your full name" />
                  <label>Email</label>
                  <input type="text" placeholder="Enter your email" />
                  <label>Title</label>
                  <input type="text" placeholder="Enter your image title" />
                </div>
                 
                  <div>
                    <div className="custom-input-image-to-album">
                      <label
                        onClick={handleFileSelect}
                        type="button"
                        id="custom-image-to-album"
                      >
                        Upload your image
                      </label>
                    </div>
                    <input
                      type="file"
                      id="fileInputNewAlbum"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </div>
                
                <img src={previewImage} alt="" id="upload-image-entry" />
                <div className="submit-entry-btn">
                  <button id="submit-contest-entry">Submit</button>
                </div>
              </div>
            </div>
            <div className="contest-submit-warning">
              <span>*</span> Please note that: your must use your own photo, we
              will check that, if we detect your using another user photo, you
              must suffer to penalties according to our community policy!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetail;

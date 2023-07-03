import './ContestDetail.css';
import {
  birthdayContest,
  fashionContest,
  petContest,
  flowersContest,
  foodContest,
  landscapeContest,
} from './contestData';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ContestDetail = () => {
  const fileInputRef = useRef(null);
  const location = useLocation();
  const checkPath = location.pathname.split('/');
  const contestType = checkPath[2];
  const [selectedContest, setSelectedContest] = useState([]);

  useEffect(() => {
    let contest = [];
    switch (contestType) {
      case 'birthday':
        contest = birthdayContest;
        break;
      case 'fashion':
        contest = fashionContest;
        break;
      case 'pet':
        contest = petContest;
        break;
      case 'flowers':
        contest = flowersContest;
        break;
      case 'food':
        contest = foodContest;
        break;
      case 'landscape':
        contest = landscapeContest;
        break;
      default:
        contest = birthdayContest;
    }
    setSelectedContest(contest);
  }, [contestType]);

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
          <img src={selectedContest.image} alt="" />
        </div>
        <div className="contest-detail-title">
          {selectedContest.title} competition
        </div>
      </div>

      <div className="contest-detail-content">
        <div className="contest-detail-description">
          <span id="contest-subtitle">Description</span>
          <p>{selectedContest.description}</p>
        </div>
        <div className="contest-detail-date">
          <span id="contest-subtitle">Deadline</span>
          <div>
            <span>Start date:</span>
            {selectedContest.startDate}
          </div>
          <div>
            <span>End date:</span>
            {selectedContest.endDate}
          </div>
        </div>
        <div className="contest-detail-prizes">
          <span id="contest-subtitle">Prizes</span>
          <ul>
            {selectedContest?.prizes?.map((prize, index) => (
              <li key={index}>
                {prize.rank} - {prize.prize}
              </li>
            ))}
          </ul>
        </div>
        <div className="contest-detail-uploader">
          <span id="contest-subtitle">Uploader</span>
          <p>Mr/Ms. {selectedContest.uploader}</p>
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

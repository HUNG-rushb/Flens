import banner from '../../assets/images/Contest/contest_banner.png';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext';
import { useUserProfileImage } from '../../graphql/useUser';
import { handleFileChange } from '../../utils/useHandleFileChange';
import './styles.scss';
import { Suspense, useCallback, useMemo, useRef, useState } from 'react';

const ContestManagement = () => {
  const { id: userId } = useAuthState();
  const {
    isFetching: isFetchingUserProfileData,
    fetchedData: userData,
    fetchError: fetchUserProfileError,
  } = useUserProfileImage({
    userInfoData: { userId },
  });

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [contestData, setContestData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    prizes: {
      firstPrize: '',
      secondPrize: '',
      thirdPrize: '',
    },
  });

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (
        name !== 'firstPrize' &&
        name !== 'secondPrize' &&
        name !== 'thirdPrize'
      ) {
        setContestData({
          ...contestData,
          [name]: value,
        });
      } else {
        setContestData({
          ...contestData,
          prizes: {
            ...contestData.prizes,
            [name]: value,
          },
        });
      }
    },
    [contestData]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = { ...contestData, image: previewImage };
      console.log(data);
    },
    [contestData, previewImage]
  );

  return useMemo(
    () => (
      <Page title="Flens-Contest management">
        <Suspense fallback={null}>
          <div className="contest-management-container">
            <div className="contest-management-wrapper">
              <div className="title">Create contest</div>
              <div className="content">
                <div className="form-item">
                  <label>Contest name</label>
                  <Input
                    placeholder="Enter contest name"
                    name="title"
                    type="text"
                    value={contestData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-item">
                  <label>Contest Image</label>
                  <div className="contest-image-wrapper">
                    <div className="upload-button">
                      <Button
                        onClick={() => fileInputRef.current.click()}
                        id="button-upload"
                        text="Choose image"
                      />
                    </div>
                    <input
                      type="file"
                      id="uploadImageInput"
                      ref={fileInputRef}
                      onChange={(event) =>
                        handleFileChange(
                          event,
                          setPreviewImage,
                          setSelectedFile
                        )
                      }
                    />
                  </div>
                </div>
                <div className="form-item">
                  <label>Contest description</label>
                  <Textarea
                    placeholder="Enter contest description"
                    rows="3"
                    name="description"
                    value={contestData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-item">
                  <label>Contest deadline</label>
                  <ul id="deadline-wrapper">
                    <li>
                      <label htmlFor="">• Start date:</label>
                      <input
                        type="date"
                        name="startDate"
                        value={contestData.startDate}
                        onChange={handleInputChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="">• End date:</label>
                      <input
                        type="date"
                        name="endDate"
                        value={contestData.endDate}
                        onChange={handleInputChange}
                      />
                    </li>
                  </ul>
                </div>
                <div className="form-item">
                  <label>Contest Price</label>
                  <ul id="prize-wrapper">
                    <li>
                      <label htmlFor="">• 1st prize:</label>
                      <Input
                        placeholder="Enter 1st prize"
                        name="firstPrize"
                        value={contestData.prizes.firstPrize}
                        onChange={handleInputChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="">• 2nd prize:</label>
                      <Input
                        placeholder="Enter 2nd prize"
                        name="secondPrize"
                        value={contestData.prizes.secondPrize}
                        onChange={handleInputChange}
                      />
                    </li>
                    <li>
                      <label htmlFor="">• 3rd prize:</label>
                      <Input
                        placeholder="Enter 3rd prize"
                        name="thirdPrize"
                        value={contestData.prizes.thirdPrize}
                        onChange={handleInputChange}
                      />
                    </li>
                  </ul>
                </div>
                <div className="button">
                  <Button text="Submit" onClick={handleSubmit} />
                </div>
              </div>
            </div>

            <div className="preview-container">
              <div className="contest-header">
                <img
                  src={previewImage ? previewImage : banner}
                  id="banner-image"
                  alt=""
                />
                <div className="contest-title">
                  {contestData.title ? contestData.title : 'contest title'}
                </div>
              </div>

              <div className="content-wrapper">
                <div className="description">
                  <span id="subtitle">Description</span>
                  <p>
                    {contestData.description
                      ? contestData.description
                      : 'contest description here'}
                  </p>
                </div>
                <div className="contest-date">
                  <span id="subtitle">Deadline</span>
                  <div className="date-item">
                    <span>Start date:</span>
                    {contestData.startDate
                      ? contestData.startDate
                      : 'Contest start date'}
                  </div>
                  <div className="date-item">
                    <span>End date:</span>
                    {contestData.endDate
                      ? contestData.endDate
                      : 'Contest end date'}
                  </div>
                </div>
                <div className="contest-prizes">
                  <span id="subtitle">Prizes</span>
                  <ul>
                    <li>
                      1st -{' '}
                      {contestData.prizes.firstPrize
                        ? contestData.prizes.firstPrize
                        : 'Contest first prize here.'}
                    </li>
                    <li>
                      2nd -{' '}
                      {contestData.prizes.secondPrize
                        ? contestData.prizes.secondPrize
                        : 'Contest second prize here.'}
                    </li>
                    <li>
                      3rd -{' '}
                      {contestData.prizes.thirdPrize
                        ? contestData.prizes.thirdPrize
                        : 'Contest third prize here.'}
                    </li>
                  </ul>
                </div>
                <div className="contest-uploader">
                  <span id="subtitle">Uploader</span>
                  <p>Mr/Ms. {userData?.userInfo?.name}</p>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </Page>
    ),
    [
      contestData.description,
      contestData.endDate,
      contestData.prizes.firstPrize,
      contestData.prizes.secondPrize,
      contestData.prizes.thirdPrize,
      contestData.startDate,
      contestData.title,
      handleInputChange,
      handleSubmit,
      previewImage,
      userData?.userInfo?.name,
    ]
  );
};

export default ContestManagement;

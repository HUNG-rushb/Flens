import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
import Page from '../../components/utils/Page.js';
import { useAuthState } from '../../context/AuthContext.js';
import { useCreatePostLazy } from '../../graphql/usePost.js';
import useUploadImageToAWS from '../../hooks/useUploadImageToAWS.js';
import './UploadImage.css';
import { EXIF } from 'exif-js';
import Jimp from 'jimp';
import React, { Suspense, useRef, useState } from 'react';
import { CloudArrowUp } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const UploadImage = () => {
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [showModalUpload, setShowModalUpload] = useState(false);

  const [description, setDescription] = useState('');

  const [title, setTitle] = useState('');
  const [aperture, setAperture] = useState('');
  const [lens, setLens] = useState('');
  const [takenWhen, setTakenWhen] = useState('');
  const [camera, setCamera] = useState('');
  const [focalLength, setFocalLength] = useState('');
  const [shutterSpeed, setShutterSpeed] = useState('');
  const [iso, setIso] = useState('');
  const [copyright, setCopyright] = useState('');

  const { createPost, isFetching, fetchedData, fetchError } =
    useCreatePostLazy();
  const uploadImageToAWS = useUploadImageToAWS();

  // console.log({ fetchedData });
  // console.log({ fetchError });

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;
      setPreviewImage(imageUrl);

      const exifData = await new Promise((resolve) => {
        EXIF.getData(file, function () {
          resolve(EXIF.getAllTags(this));
        });
      });
      // console.log({ exifData });

      setTitle(file.name.substring(0, file.name.indexOf('.')));
      setCamera(exifData.Model ? exifData.Model.toString() : '');
      setAperture(exifData.FNumber ? exifData.FNumber.toString() : '');
      setShutterSpeed(
        exifData.ShutterSpeedValue ? exifData.ShutterSpeedValue.toString() : ''
      );
      setFocalLength(
        exifData.FocalLength ? exifData.FocalLength.toString() : ''
      );
      setTakenWhen(
        exifData.DateTimeOriginal ? exifData.DateTimeOriginal.toString() : ''
      );
      setIso(
        exifData.ISOSpeedRatings ? exifData.ISOSpeedRatings.toString() : ''
      );
      setCopyright(exifData.Copyright ? exifData.Copyright.toString() : '');
    };

    reader.readAsDataURL(file);
    setShowModalUpload(true);

    setSelectedFile(file);
  };

  // Create Post
  const handleConfirmUpload = async (event) => {
    event.preventDefault();

    const result = await uploadImageToAWS({ selectedFile });
    console.log({ result });

    try {
      await createPost({
        variables: {
          createPostData: {
            categoryId: '649693993ace6fb861402cfc',
            userId,
            title,
            aperture,
            lens,
            takenWhen,
            camera,
            focalLength,
            shutterSpeed,
            ISO: iso,
            copyRight: copyright,
            imageHash: '',
            imageURL: result.Location,
          },
        },
      });

      // navigate('/');
    } catch (e) {
      throw e;
    }

    // console.log(fetchError);
    if (!fetchError) {
      navigate('/');
    }
  };

  const handleCancelUpload = (event) => {
    event.preventDefault();
    setShowModalUpload(false);
  };

  const [tags, setTags] = useState([
    {
      id: 1,
      value: 'aa',
    },
    {
      id: 2,
      value: 'bb',
    },
  ]);

  const [initTag, setInitTag] = useState({
    id: 0,
    value: '',
  });

  const hanlePressEnter = (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
      console.log("press enter")
      console.log(initTag)
      // tags.push(initTag);
      // setTags(tags);
      // setInitTag({
      //   id: 0,
      //   value: '',
      // });
    }

  }

  const [a, setA] = useState('')

  return (
    <Page title="Flens-Upload">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="upload-image-page">
          <div className="upload-image-content">
            <div className="upload-image-title">
              <CloudArrowUp size={45} color="#f08080" />
              <span>Upload</span>
            </div>

            <div className="upload-image-text">Drop a photo here</div>

            <div className="upload-image-input">
              <label
                className="custom-file-input"
                type="button"
                onClick={handleFileSelect}
              >
                Upload a photo
              </label>

              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            <div className="modal-upload-overlay" hidden={!showModalUpload}>
              <div className="modal-upload-container">
                <div className="modal-upload-content">
                  <div className="modal-upload-left">
                    <img src={previewImage} alt="" />
                  </div>
                  <div className="modal-upload-right">
                    <div className="modal-upload-details">
                      <div>
                        <label htmlFor="">Title</label>
                        <input
                          type="text"
                          value={title}
                          placeholder="input tittle for image"
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="">Camera</label>
                        <input
                          type="text"
                          placeholder="Input your Camera"
                          value={camera}
                          onChange={(event) => setCamera(event.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="">Lens</label>
                        <input
                          type="text"
                          placeholder="Input your Lens"
                          value={lens}
                          onChange={(event) => setLens(event.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="">Aperture</label>
                        <input
                          type="text"
                          placeholder="Input your Aperture"
                          value={aperture !== '' ? 'f/' + aperture : ''}
                          onChange={(event) => setAperture(event.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="">Shutter speed</label>
                        <input
                          type="text"
                          placeholder="Input your Shutter speed"
                          value={shutterSpeed}
                          onChange={(event) =>
                            setShutterSpeed(event.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label htmlFor="">Taken</label>
                        <input
                          type="text"
                          placeholder="Taken when"
                          value={takenWhen}
                          onChange={(event) => setTakenWhen(event.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="">Focal length</label>
                        <input
                          type="text"
                          placeholder="Input your Focal length"
                          value={focalLength !== '' ? focalLength + 'mm' : ''}
                          onChange={(event) =>
                            setFocalLength(event.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label htmlFor="">ISO</label>
                        <input
                          type="text"
                          placeholder="Input your ISO"
                          value={iso}
                          onChange={(event) => setIso(event.target.value)}
                        />
                      </div>

                      <div className="all-tags">
                        {tags.map((item) => {
                          return <div key={item.id}>{item.value}</div>;
                        })}
                      </div>
                      <input
                        type="text"
                        placeholder="Input a tag and press enter"
                        value={a}
                        onChange={(e)=>setA(e.target.value)}
                        onKeyDown={(e)=>hanlePressEnter(e)}
                      />

                      <div>
                        <label htmlFor="">CopyRight</label>
                        <input
                          type="text"
                          placeholder="Input your CopyRight"
                          value={copyright}
                          onChange={(event) => setCopyright(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="modal-buttons">
                      <div className="button-close">
                        <ButtonCustom
                          text={'Cancel'}
                          type="modal-close-btn"
                          onClick={(e) => handleCancelUpload(e)}
                        />
                      </div>

                      <div className="button-confirm">
                        <ButtonCustom
                          text={'Upload'}
                          type="modal-save-btn"
                          onClick={(event) => handleConfirmUpload(event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default UploadImage;

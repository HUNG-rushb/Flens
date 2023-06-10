import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
import Page from '../../components/utils/Page.js';
import './UploadImage.css';
import { EXIF } from 'exif-js';
import React, { Suspense, useRef, useState } from 'react';
import { CloudArrowUp } from 'react-bootstrap-icons';

const UploadImage = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModalUpload, setShowModalUpload] = useState(false);

  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [camera, setCamera] = useState('');
  const [focalLength, setFocalLength] = useState('');
  const [shutterSpeed, setShutterSpeed] = useState('');
  const [iso, setIso] = useState('');
  const [copyright, setCopyright] = useState('');

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.onload = function () {
        EXIF.getData(file, function () {
          const exifData = EXIF.pretty(this);
          console.log('EXIF Data:', exifData);
        });
      };
      image.src = imageUrl;
      setPreviewImage(imageUrl);
    };

    reader.readAsDataURL(file);
    setShowModalUpload(true);
  };

  const handleConfirmUpload = (event) => {
    event.preventDefault();
    console.log(event.target.value)
  }

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
                <form className="modal-upload-content">
                  <div className="modal-upload-left">
                    <img src={previewImage} alt="" />
                  </div>
                  <div className="modal-upload-right">
                    <div className="modal-upload-details">
                      <div>
                        <label htmlFor="">Tittle</label>
                        <input
                          type="text"
                          value={tittle}
                          placeholder="input tittle for image"
                          onChange={(event) => setTittle(event.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="">Description</label>
                        <textarea
                          id="text-upload"
                          cols="30"
                          rows="10"
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="">Tags</label>
                        <input
                          type="text"
                          value={tags}
                          onChange={(event) => setTags(event.target.value)}
                          placeholder="input some tags"
                        />
                      </div>
                      <div>
                        <label htmlFor="">Camera</label>
                        <input
                          type="text"
                          placeholder="input your camera"
                          value={camera}
                          onChange={(event) => setCamera(event.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="">Focal length</label>
                        <input
                          type="text"
                          placeholder="input Focal length"
                          value={focalLength}
                          onChange={(event) =>
                            setFocalLength(event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="">Shutter speed</label>
                        <input
                          type="text"
                          placeholder="input Shutter speed"
                          value={shutterSpeed}
                          onChange={(event) =>
                            setShutterSpeed(event.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="">ISO</label>
                        <input
                          type="text"
                          placeholder="input ISO"
                          value={iso}
                          onChange={(event) => setIso(event.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="">CopyRight</label>
                        <input
                          type="text"
                          placeholder="input CopyRight"
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
                          onClick={() => setShowModalUpload(false)}
                        />
                      </div>
                      <div className="button-confirm">
                        <ButtonCustom
                          text={'Upload'}
                          type="modal-save-btn"
                          onClick={(event)=>handleConfirmUpload(event)}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </Page>
  );
};

export default UploadImage;

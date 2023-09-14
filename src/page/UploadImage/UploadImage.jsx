import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
import InputCustom from '../../components/Input/Input.jsx';
import Page from '../../components/utils/Page.js';
import { useAuthState } from '../../context/AuthContext.js';
import { useCreatePostLazy } from '../../graphql/usePost.js';
import useUploadImageToAWS from '../../hooks/useUploadImageToAWS.js';
import './UploadImage.css';
import { EXIF } from 'exif-js';
import Jimp from 'jimp';
import React, { Suspense, useRef, useState, useMemo } from 'react';
import { CloudArrowUp } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const UploadImage = () => {
  const navigate = useNavigate();
  const { id: userId, name } = useAuthState();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [showModalUpload, setShowModalUpload] = useState(false);

  const [title, setTitle] = useState('');
  const [aperture, setAperture] = useState('');
  const [lens, setLens] = useState('');
  const [takenWhen, setTakenWhen] = useState('');
  const [camera, setCamera] = useState('');
  const [focalLength, setFocalLength] = useState('');
  const [shutterSpeed, setShutterSpeed] = useState('');
  const [iso, setIso] = useState('');
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({
    id: 0,
    value: '',
  });
  const [selectedCatagory, setSelectedCategory] = useState('');
  // console.log(selectedCatagory);

  const options = useMemo(
    () => [
      { name: 'All categories', id: '64ecb68380295e50c958e547' },
      { name: 'Animal', id: '64edaf03809a20aed5684794' },
      { name: 'Architecture', id: '64edaf2d809a20aed5684795' },
      { name: 'Black and White', id: '64edaf3c809a20aed5684796' },
      { name: 'Cityscapes', id: '64edaf4c809a20aed5684797' },
      { name: 'Family', id: '64edaf62809a20aed5684798' },
      { name: 'Fashion', id: '64edaf66809a20aed5684799' },
      { name: 'Film', id: '64edaf72809a20aed568479a' },
      { name: 'Food', id: '64edaf77809a20aed568479b' },
      { name: 'Vintage', id: '64edafb5809a20aed568479c' },
      { name: 'Vehicle', id: '64edafbb809a20aed568479d' },
      { name: 'Urban', id: '64edafbf809a20aed568479e' },
      { name: 'Underwater', id: '64edb08f809a20aed568479f' },
      { name: 'Travel', id: '64edb0a5809a20aed56847a0' },
      { name: 'Street photography', id: '64edb0ae809a20aed56847a1' },
      { name: 'Sports', id: '64edb0c7809a20aed56847a2' },
      { name: 'Landscape', id: '64edb0df809a20aed56847a3' },
      { name: 'Nature', id: '64edb0e2809a20aed56847a4' },
      { name: 'Sea', id: '64edb0f6809a20aed56847a5' },
      { name: 'People', id: '64edb117809a20aed56847a7' },
      { name: 'Interior', id: '64edb11c809a20aed56847a8' },
      { name: 'Random', id: '64edb0f9809a20aed56847a6' },
    ],
    []
  );
  const [copyright, setCopyright] = useState('');

  const { createPost, isFetching, fetchedData, fetchError } =
    useCreatePostLazy();
  const uploadImageToAWS = useUploadImageToAWS();

  // console.log({ fetchedData });
  // console.log({ fetchError });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      tags.push(tag);
      setTags(tags);
      setTag({
        id: 0,
        value: '',
      });
    }
  };

  const removeTag = (id) => {
    const removeTag = tags.filter((item) => item.id !== id);
    setTags(removeTag);
  };

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

      setTitle(file.name.substring(0, file.name.indexOf('.')));
      setCamera(exifData.Model ? exifData.Model.toString() : '');
      setAperture(exifData.FNumber ? exifData.FNumber.toString() : '');
      setShutterSpeed(
        exifData.ShutterSpeedValue
          ? '1/' +
              Math.trunc(
                1 / Math.pow(2, -exifData.ShutterSpeedValue)
              ).toString()
          : ''
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
            categoryId: '6496c183518d8caaf82fcaca',
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
      toast.info('upload image sucessfull!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (e) {
      throw e;
    }

    if (!fetchError) {
      navigate('/');
    }
  };

  const handleCancelUpload = (event) => {
    event.preventDefault();
    setShowModalUpload(false);
  };

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
                        <label>Title</label>
                        <input
                          type="text"
                          value={title}
                          placeholder="input tittle for this image"
                          onChange={(event) => setTitle(event.target.value)}
                        />
                      </div>
                      <div>
                        <label>Camera</label>
                        <input
                          type="text"
                          placeholder="Input Camera"
                          value={camera}
                          onChange={(event) => setCamera(event.target.value)}
                        />
                      </div>

                      <div>
                        <label>Lens</label>
                        <input
                          type="text"
                          placeholder="Input Lens"
                          value={lens}
                          onChange={(event) => setLens(event.target.value)}
                        />
                      </div>

                      <div>
                        <label>Aperture</label>
                        <input
                          type="text"
                          placeholder="Input Aperture"
                          value={aperture !== '' ? 'f/' + aperture : ''}
                          onChange={(event) => setAperture(event.target.value)}
                        />
                      </div>

                      <div>
                        <label>Shutter speed</label>
                        <input
                          type="text"
                          placeholder="Input Shutter speed"
                          value={shutterSpeed + ' s'}
                          onChange={(event) =>
                            setShutterSpeed(event.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label>Taken</label>
                        <input
                          type="text"
                          placeholder="Taken when"
                          value={takenWhen}
                          onChange={(event) => setTakenWhen(event.target.value)}
                        />
                      </div>

                      <div>
                        <label>Focal length</label>
                        <input
                          type="text"
                          placeholder="Input Focal length"
                          value={focalLength !== '' ? focalLength + ' mm' : ''}
                          onChange={(event) =>
                            setFocalLength(event.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label>ISO</label>
                        <input
                          type="text"
                          placeholder="Input ISO"
                          value={iso}
                          onChange={(event) => setIso(event.target.value)}
                        />
                      </div>

                      <div>
                        <label>Tags</label>
                        {tags.length > 0 && (
                          <div className="all-tags">
                            {tags.map((item) => {
                              return (
                                <div
                                  key={item.id}
                                  onClick={() => removeTag(item.id)}
                                >
                                  <span id="remove-tag">X</span>
                                  {item.value}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <input
                          type="text"
                          placeholder="Input a tag and press enter"
                          onChange={(e) =>
                            setTag({
                              id:
                                tags.length === 0
                                  ? 1
                                  : tags[tags.length - 1].id + 1,
                              value: e.target.value,
                            })
                          }
                          onKeyDown={(e) => handleKeyDown(e)}
                          value={tag.value}
                        />
                      </div>

                      <div className="image-categories">
                        <label>Category</label>
                        <select
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          id="select-image-category"
                        >
                          {options.map((item, idx) => {
                            return <option key={idx}>{item.name}</option>;
                          })}
                        </select>
                      </div>

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

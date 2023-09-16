import ButtonCustom from '../../components/Button/ButtonCustom.jsx';
import Page from '../../components/utils/Page.js';
import { useAuthState } from '../../context/AuthContext.js';
import { useCreatePostLazy } from '../../graphql/usePost.js';
import useModal from '../../hooks/useModal.jsx';
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
  const { isShowing: showUpload, toggle: toggleShowUpload } = useModal();

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
  const options = useMemo(() => ['Family', 'Fashion', 'Food'], []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    id: 1,
    value: options[0],
  });

  const [copyright, setCopyright] = useState('');

  const { createPost, isFetching, fetchedData, fetchError } =
    useCreatePostLazy();
  const uploadImageToAWS = useUploadImageToAWS();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const checkExistTag = tags.every(
        (item) => item.value !== event.target.value
      );
      if (checkExistTag && tag.value) {
        tags.push(tag);
        setTags(tags);
        setTag({
          id: 0,
          value: '',
        });
      } else {
        setTag({
          id: 0,
          value: '',
        });
      }
    }
  };

  const removeTag = (id) => {
    const removeTag = tags.filter((item) => item.id !== id);
    setTags(removeTag);
  };

  const handleSelectCategory = () => {
    console.log(categories)
    const checkExistCategory = categories.every(
      (item) => item.value !== category.value
    ); 
    if (checkExistCategory && category.value) {
      categories.push(category);
      setCategories(categories);
      setCategory({
        id: 0,
        value: '',
      });
    } else {
      setCategory({
        id: 0,
        value: '',
      });
    }
  };

  const removeCategory = (id) => {
    const removeCategory = categories.filter((item) => item.id !== id);
    setCategories(removeCategory);
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
    toggleShowUpload(true);
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
                onClick={() => fileInputRef.current.click()}
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

            <div className="modal-upload-overlay" hidden={!showUpload}>
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

                      <div className="all-categories">
                        <label>Category</label>
                        {categories.length > 0 && (
                          <div className="categories-item">
                            {categories.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => removeCategory(item.id)}
                              >
                                <span id="remove-tag">X</span>
                                {item.value}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="sub-categories">
                          <select
                            value={category.value}
                            id="select-image-category"
                            onChange={(e) =>
                              setCategory({
                                id:
                                  categories.length === 0
                                    ? 1
                                    : categories[categories.length - 1].id + 1,
                                value: e.target.value,
                              })
                            }
                          >
                            {options.map((item) => {
                              return (
                                <option key={options.indexOf(item)}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                          <div className="add-category-button">
                            <button onClick={handleSelectCategory}>Add</button>
                          </div>
                        </div>
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
                          onClick={(event) => [
                            event.preventDefault(),
                            toggleShowUpload(false),
                          ]}
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

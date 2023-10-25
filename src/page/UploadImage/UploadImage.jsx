import Button from '../../components/Button/Button';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext.js';
import { useGetAllUserAlbum } from '../../graphql/useAlbum.js';
import {
  useCreatePostLazy,
  useUpdatePointPostingLazy,
  useCreateTag,
} from '../../graphql/usePost.js';
import useModal from '../../hooks/useModal.jsx';
import useUploadImageToAWS from '../../hooks/useUploadImageToAWS.js';
import { successfullNoty } from '../../utils/useNotify.js';
import {
  renderAddItemBySelect,
  renderInputField,
  renderInputTags,
} from '../../utils/useRenderInputField.js';
import './UploadImage.css';
import { EXIF } from 'exif-js';
// import Jimp from 'jimp';
import React, { Suspense, useRef, useState, useMemo, useCallback } from 'react';
import { CloudArrowUp } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const UploadImage = () => {
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
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const { isShowing: showUpload, toggle: toggleShowUpload } = useModal();

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [aperture, setAperture] = useState('');
  const [lens, setLens] = useState('');
  const [takenWhen, setTakenWhen] = useState('');
  const [camera, setCamera] = useState('');
  const [focalLength, setFocalLength] = useState('');
  const [shutterSpeed, setShutterSpeed] = useState('');
  const [iso, setIso] = useState('');
  const [copyright, setCopyright] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  console.log(isPublic);

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({
    id: 0,
    value: '',
  });

  const [categories, setCategories] = useState([options[0]]);
  const [category, setCategory] = useState(options[0]);

  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState({
    id: '',
    name: '',
  });
  const { fetchedData: userAlbums } = useGetAllUserAlbum(
    {
      userAllAlbumData: { userId },
    },
    setAlbum
  );

  const { createPost, isFetching, fetchedData, fetchError } =
    useCreatePostLazy();

  const { updateLevel } = useUpdatePointPostingLazy();
  const { createTag } = useCreateTag();

  const uploadImageToAWS = useUploadImageToAWS();

  const handleKeyDown = useCallback(
    (event) => {
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
    },
    [tag, tags]
  );

  const handleSelectAlbum = useCallback(() => {
    if (albums.filter((e) => e.id === album.id).length === 0) {
      setAlbums((prev) => [...prev, album]);
    }
  }, [album, albums]);

  const handleSelectCategory = useCallback(() => {
    if (categories.filter((e) => e.id === category.id).length === 0) {
      setCategories((prev) => [...prev, category]);
    }
  }, [categories, category]);

  const handleFileChange = useCallback(
    (event) => {
      // console.log(Jimp);
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
    },
    [toggleShowUpload]
  );

  // Create Post
  const handleConfirmUpload = useCallback(
    async (event) => {
      event.preventDefault();

      const result = await uploadImageToAWS({ selectedFile });

      try {
        await createPost({
          variables: {
            createPostData: {
              userId,
              title,
              caption: '',
              isVisible: true,
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

              categoryId: categories.map((a) => a.id),
              albumId: albums.map((a) => a.id),
              tag: [
                ...new Set(
                  tags
                    .map((a) => a.value)
                    .map((element) => element.toLowerCase())
                ),
              ],
            },
          },
        });

        await updateLevel({
          variables: {
            updatePointPostingData: {
              userId,
              xp: 50,
            },
          },
        });

        await createTag({
          variables: {
            createTagData: {
              name: [
                ...new Set(
                  tags
                    .map((a) => a.value)
                    .map((element) => element.toLowerCase())
                ),
              ],
            },
          },
        });
        successfullNoty('upload image sucessfull!');
      } catch (e) {
        throw e;
      }

      if (!fetchError) {
        navigate('/');
      }
    },
    [
      albums,
      aperture,
      camera,
      categories,
      copyright,
      createPost,
      createTag,
      fetchError,
      focalLength,
      iso,
      lens,
      navigate,
      selectedFile,
      shutterSpeed,
      tags,
      takenWhen,
      title,
      updateLevel,
      uploadImageToAWS,
      userId,
    ]
  );

  const handleCancelUpload = useCallback(
    (event) => {
      event.preventDefault();
      toggleShowUpload(false);
      setCategories([]);
      setCategory({
        id: 1,
        value: options[0],
      });
    },
    [options, toggleShowUpload]
  );

  const inputData = useMemo(
    () => [
      {
        label: 'Title',
        placeholder: 'Input title for this image',
        field: title,
        setField: setTitle,
      },
      {
        label: 'Caption',
        placeholder: 'Input caption for this image',
        field: caption,
        setField: setCaption,
      },
      {
        label: 'Camera',
        placeholder: 'Input Camera',
        field: camera,
        setField: setCamera,
      },
      {
        label: 'Lens',
        placeholder: 'Input Lens',
        field: lens,
        setField: setLens,
      },
      {
        label: 'Aperture',
        placeholder: 'Input Aperture',
        field: aperture,
        setField: setAperture,
      },
      {
        label: 'Shutter speed',
        placeholder: 'Input Shutter speed',
        field: shutterSpeed,
        setField: setShutterSpeed,
      },
      {
        label: 'Focal length',
        placeholder: 'Input Focal length',
        field: focalLength,
        setField: setFocalLength,
      },
      {
        label: 'ISO',
        placeholder: 'Input ISO',
        field: iso,
        setField: setIso,
      },
      {
        label: 'Taken when',
        placeholder: 'Taken when',
        field: takenWhen,
        setField: setTakenWhen,
      },
      {
        label: 'Copyright',
        placeholder: 'Input CopyRight',
        field: copyright,
        setField: setCopyright,
      },
    ],
    [
      aperture,
      camera,
      caption,
      copyright,
      focalLength,
      iso,
      lens,
      shutterSpeed,
      takenWhen,
      title,
    ]
  );

  const InputDataBySelect = useMemo(
    () => [
      {
        label: 'Category',
        Array: categories,
        setArray: setCategories,
        value: category,
        setValue: setCategory,
        options: options,
        handleSelect: handleSelectCategory,
      },
      {
        label: 'Album',
        Array: albums,
        setArray: setAlbums,
        value: album,
        setValue: setAlbum,
        options: userAlbums?.userAllAlbum,
        handleSelect: handleSelectAlbum,
      },
    ],
    [
      album,
      albums,
      categories,
      category,
      handleSelectAlbum,
      handleSelectCategory,
      options,
      userAlbums?.userAllAlbum,
    ]
  );

  const handleChangeMode = () => {
    setIsPublic((prev) => !prev);
  };

  return useMemo(
    () => (
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
                        {inputData.map((item) =>
                          renderInputField(
                            item.label,
                            item.placeholder,
                            item.field,
                            item.setField
                          )
                        )}
                        <div>
                          <label>Mode</label>
                          <div className="post-mode">
                            <label>
                              Public
                              <div id="input-radio">
                                <input
                                  type="radio"
                                  name="mode"
                                  value="Public"
                                  checked={isPublic}
                                  onChange={handleChangeMode}
                                />
                              </div>
                            </label>

                            <label>
                              Private
                              <div id="input-radio">
                                <input
                                  type="radio"
                                  name="mode"
                                  value="Private"
                                  checked={!isPublic}
                                  onChange={handleChangeMode}
                                />
                              </div>
                            </label>
                          </div>
                        </div>

                        {renderInputTags(
                          'Tags',
                          tags,
                          setTags,
                          tag,
                          setTag,
                          handleKeyDown
                        )}
                        {InputDataBySelect.map((item) =>
                          renderAddItemBySelect(
                            item.label,
                            item.Array,
                            item.setArray,
                            item.value,
                            item.setValue,
                            item.options,
                            item.handleSelect
                          )
                        )}
                      </div>

                      <div className="modal-buttons">
                        <div className="button-close">
                          <Button
                            text="Cancel"
                            type="modal-close-btn"
                            onClick={(e) => handleCancelUpload(e)}
                          />
                        </div>

                        <div className="button-confirm">
                          <Button
                            text="Upload"
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
    ),
    [
      InputDataBySelect,
      handleCancelUpload,
      handleConfirmUpload,
      handleFileChange,
      handleKeyDown,
      inputData,
      isPublic,
      previewImage,
      showUpload,
      tag,
      tags,
    ]
  );
};

export default UploadImage;

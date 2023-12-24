import Modal from '../../components/Modal/Modal.jsx';
import Page from '../../components/utils/Page';
import { useAuthState } from '../../context/AuthContext.js';
import {
  PostInfoReducer,
  initialPostInfo,
} from '../../context/reducer/PostReducer';
import { useGetAllUserAlbum } from '../../graphql/useAlbum.js';
import {
  useCreatePostLazy,
  useUpdatePointPostingLazy,
  useCreateTag,
} from '../../graphql/usePost.js';
import useModal from '../../hooks/useModal.jsx';
import useUploadImageToAWS from '../../hooks/useUploadImageToAWS.js';
import Loading from '../../utils/useLoading';
import { successfullNoty } from '../../utils/useNotify.js';
import {
  renderAddItemBySelect,
  renderInputField,
  renderInputTag,
} from '../../utils/useRenderInputField.js';
import './UploadImage.css';
import { EXIF } from 'exif-js';
import React, {
  Suspense,
  useRef,
  useState,
  useMemo,
  useCallback,
  useReducer,
} from 'react';
import { CloudArrowUp } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';

const UploadImage = ({ contestId = '' }) => {
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
  const { isShowing: showUpload, toggle: toggleShow } = useModal();

  const [viewStatus, setViewStatus] = useState('PUBLIC');
  const [postInfor, dispatch] = useReducer(PostInfoReducer, initialPostInfo);

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

  const isDisabledButton = useMemo(
    () =>
      postInfor.title &&
      postInfor.copyright &&
      tags.length &&
      categories.length,
    [categories.length, postInfor.copyright, postInfor.title, tags.length]
  );

  const { createPost, isFetching, fetchError } = useCreatePostLazy();

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

        const exifInfo = [
          {
            field: 'title',
            value: file.name.substring(0, file.name.indexOf('.')),
          },
          {
            field: 'camera',
            value: exifData.Model ? exifData.Model.toString() : '',
          },
          {
            field: 'aperture',
            value: exifData.FNumber ? exifData.FNumber.toString() : '',
          },
          {
            field: 'shutterSpeed',
            value: exifData.ShutterSpeedValue
              ? '1/' +
                Math.trunc(
                  1 / Math.pow(2, -exifData.ShutterSpeedValue)
                ).toString()
              : '',
          },
          {
            field: 'focalLength',
            value: exifData.FocalLength ? exifData.FocalLength.toString() : '',
          },
          {
            field: 'takenWhen',
            value: exifData.DateTimeOriginal
              ? exifData.DateTimeOriginal.toString()
              : '',
          },
          {
            field: 'iso',
            value: exifData.ISOSpeedRatings
              ? exifData.ISOSpeedRatings.toString()
              : '',
          },
          {
            field: 'copyright',
            value: exifData.Copyright ? exifData.Copyright.toString() : '',
          },
        ];
        exifInfo.forEach(({ field, value }) => {
          dispatch({
            type: 'UPDATE_POST_FIELD',
            field,
            value,
          });
        });
      };

      reader.readAsDataURL(file);
      toggleShow(true);
      setSelectedFile(file);
    },
    [toggleShow]
  );

  const handleConfirmUpload = useCallback(
    async (event) => {
      event.preventDefault();
      const result = await uploadImageToAWS({ selectedFile });
      try {
        await createPost({
          variables: {
            createPostData: {
              userId,
              title: postInfor.title,
              caption: postInfor.caption,
              contestId: contestId,
              postViewStatus: viewStatus,
              aperture: postInfor.aperture,
              lens: postInfor.lens,
              takenWhen: postInfor.takenWhen,
              camera: postInfor.camera,
              focalLength: postInfor.focalLength,
              shutterSpeed: postInfor.shutterSpeed,
              ISO: postInfor.iso,
              copyRight: postInfor.copyright,
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
        toggleShow();
        successfullNoty('Upload image sucessfull!');
        setTags([]);
        setCategory({
          id: 1,
          value: options[0],
        });
        navigate('/');
      } catch (e) {
        throw e;
      }

      if (!fetchError) {
        navigate('/');
      }
    },
    [
      albums,
      categories,
      contestId,
      createPost,
      createTag,
      fetchError,
      navigate,
      options,
      postInfor.aperture,
      postInfor.camera,
      postInfor.caption,
      postInfor.copyright,
      postInfor.focalLength,
      postInfor.iso,
      postInfor.lens,
      postInfor.shutterSpeed,
      postInfor.takenWhen,
      postInfor.title,
      selectedFile,
      tags,
      toggleShow,
      updateLevel,
      uploadImageToAWS,
      userId,
      viewStatus,
    ]
  );

  const handleCancelUpload = useCallback(() => {
    toggleShow();
    setTags([])
    setCategories([]);
    setCategory({
      id: 1,
      value: options[0],
    });
  }, [options, toggleShow]);

  const inputData = useMemo(
    () => [
      {
        label: 'Title',
        placeholder: 'Input title for this image',
        value: postInfor.title,
      },
      {
        label: 'Caption',
        placeholder: 'Input caption for this image',
        value: postInfor.caption,
      },
      {
        label: 'Camera',
        placeholder: 'Input Camera',
        value: postInfor.camera,
      },
      {
        label: 'Lens',
        placeholder: 'Input Lens',
        value: postInfor.lens,
      },
      {
        label: 'Aperture',
        placeholder: 'Input Aperture',
        value: postInfor.aperture,
      },
      {
        label: 'Shutter speed',
        placeholder: 'Input Shutter speed',
        value: postInfor.shutterSpeed,
      },
      {
        label: 'Focal length',
        placeholder: 'Input Focal length',
        value: postInfor.focalLength,
      },
      {
        label: 'ISO',
        placeholder: 'Input ISO',
        value: postInfor.iso,
      },
      {
        label: 'Taken when',
        placeholder: 'Taken when',
        value: postInfor.takenWhen,
      },
      {
        label: 'Copyright',
        placeholder: 'Input CopyRight',
        value: postInfor.copyright,
      },
    ],
    [
      postInfor.aperture,
      postInfor.camera,
      postInfor.caption,
      postInfor.copyright,
      postInfor.focalLength,
      postInfor.iso,
      postInfor.lens,
      postInfor.shutterSpeed,
      postInfor.takenWhen,
      postInfor.title,
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

  const handleChangeMode = useCallback((viewStatus) => {
    setViewStatus(viewStatus);
  }, []);

  const RenderUploadContent = useCallback(() => {
    return (
      <div className="modal-upload-content">
        <div className="modal-upload-left">
          <img src={previewImage} alt="" />
        </div>
        <div className="modal-upload-right">
          <div className="modal-upload-details">
            {inputData.map((item, idx) =>
              renderInputField(
                item.label,
                item.placeholder,
                item.value,
                dispatch,
                'UPDATE_POST_FIELD',
                idx
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
                      checked={viewStatus === 'PUBLIC'}
                      onChange={(e) => {
                        handleChangeMode('PUBLIC');
                      }}
                    />
                  </div>
                </label>

                <label>
                  Private
                  <div id="input-radio">
                    <input
                      type="radio"
                      name="mode"
                      checked={viewStatus === 'PRIVATE'}
                      onChange={(e) => {
                        handleChangeMode('PRIVATE');
                      }}
                    />
                  </div>
                </label>

                <label>
                  Only Followers
                  <div id="input-radio">
                    <input
                      type="radio"
                      name="mode"
                      checked={viewStatus === 'ONLY_FOLLOWERS'}
                      onChange={(e) => {
                        handleChangeMode('ONLY_FOLLOWERS');
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>

            {renderInputTag(
              'Tags',
              tags,
              setTags,
              tag,
              setTag,
              handleKeyDown,
              'post'
            )}
            {InputDataBySelect.map((item, idx) =>
              renderAddItemBySelect(
                item.label,
                item.Array,
                item.setArray,
                item.value,
                item.setValue,
                item.options,
                item.handleSelect,
                'post',
                idx
              )
            )}
          </div>
        </div>
      </div>
    );
  }, [
    InputDataBySelect,
    handleChangeMode,
    handleKeyDown,
    inputData,
    previewImage,
    tag,
    tags,
    viewStatus,
  ]);

  return useMemo(
    () => (
      <Page title="Flens-Upload">
        <Suspense fallback={null}>
          <div className="upload-image-content">
            <div
              style={{
                display: 'flex',
                gap: 7,
              }}
            >
              <CloudArrowUp size={45} color="#f08080" />
              <span style={{ fontSize: 30, fontWeight: 700, color: '#f08080' }}>
                Flens - Upload Photo
              </span>
            </div>

            <div style={{ fontSize: 25, padding: '20px 0' }}>
              Select a photo !
            </div>
            <div className="upload-image-input">
              <label
                className="custom-file-input"
                onClick={() => fileInputRef.current.click()}
              >
                Choose a photo from your device
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <Loading loading={isFetching} />
          <Modal
            show={showUpload}
            modalContent={RenderUploadContent()}
            handleClose={handleCancelUpload}
            handleSavechanges={handleConfirmUpload}
            disabled={!isDisabledButton}
            submitText="Upload"
            size="xl"
          />
        </Suspense>
      </Page>
    ),
    [
      handleFileChange,
      isFetching,
      showUpload,
      RenderUploadContent,
      handleCancelUpload,
      handleConfirmUpload,
      isDisabledButton,
    ]
  );
};

export default UploadImage;

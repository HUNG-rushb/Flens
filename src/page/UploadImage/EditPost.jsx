import Button from '../../components/Button/Button.jsx';
import { useAuthState } from '../../context/AuthContext.js';
import { PostInfoReducer } from '../../context/reducer/PostReducer.js';
import { useGetAllUserAlbum } from '../../graphql/useAlbum.js';
import {
  renderAddItemBySelect,
  renderInputField,
  renderInputTags,
} from '../../utils/useRenderInputField.js';
import './EditPost.scss';
import React, { useState, useMemo, useCallback, useReducer } from 'react';

const EditPost = ({ show, toggleShow, post }) => {
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
  const { id: userId } = useAuthState();

  const [viewStatus, setViewStatus] = useState(post?.postViewStatus);
  const [postInfor, dispatch] = useReducer(PostInfoReducer, post);

  const [tags, setTags] = useState(post?.tag);
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

  // edit Post
  const handleConfirm = useCallback(async (event) => {
    event.preventDefault();
  }, []);

  const handleCancel = useCallback(
    (event) => {
      event.preventDefault();
      toggleShow();
      setCategories([]);
      setCategory({
        id: 1,
        value: options[0],
      });
    },
    [options, toggleShow]
  );

  const inputData = useMemo(
    () => [
      {
        label: 'Title',
        placeholder: 'Input title for this image',
        value: postInfor?.title,
      },
      {
        label: 'Caption',
        placeholder: 'Input caption for this image',
        value: postInfor?.caption,
      },
      {
        label: 'Camera',
        placeholder: 'Input Camera',
        value: postInfor?.image?.imageInfoId?.camera,
      },
      {
        label: 'Lens',
        placeholder: 'Input Lens',
        value: postInfor?.image?.imageInfoId?.lens,
      },
      {
        label: 'Aperture',
        placeholder: 'Input Aperture',
        value: postInfor?.image?.imageInfoId?.aperture,
      },
      {
        label: 'Shutter speed',
        placeholder: 'Input Shutter speed',
        value: postInfor?.image?.imageInfoId?.shutterSpeed,
      },
      {
        label: 'Focal length',
        placeholder: 'Input Focal length',
        value: postInfor?.image?.imageInfoId?.focalLength,
      },
      {
        label: 'ISO',
        placeholder: 'Input ISO',
        value: postInfor?.image?.imageInfoId?.iso,
      },
      {
        label: 'Taken when',
        placeholder: 'Taken when',
        value: postInfor?.image?.imageInfoId?.takenWhen,
      },
      {
        label: 'Copyright',
        placeholder: 'Input CopyRight',
        value: postInfor?.image?.imageInfoId?.copyright,
      },
    ],
    [
      postInfor?.title,
      postInfor?.caption,
      postInfor?.image?.imageInfoId?.camera,
      postInfor?.image?.imageInfoId?.lens,
      postInfor?.image?.imageInfoId?.aperture,
      postInfor?.image?.imageInfoId?.shutterSpeed,
      postInfor?.image?.imageInfoId?.focalLength,
      postInfor?.image?.imageInfoId?.iso,
      postInfor?.image?.imageInfoId?.takenWhen,
      postInfor?.image?.imageInfoId?.copyright,
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

  return useMemo(
    () => (
      <div
        className="modal-edit-overlay"
        hidden={!show}
        key={post?.id + Math.random()}
      >
        <div className="modal-edit-container">
          <div className="modal-upload-content">
            <div className="modal-upload-left">
              <img src={post?.image?.url} alt="" />
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
                    'edit',
                    post?.id
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
                          onChange={() => {
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

                {renderInputTags(
                  'Tags',
                  tags,
                  setTags,
                  tag,
                  setTag,
                  handleKeyDown,
                  'edit',
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
                    'edit',
                    idx
                  )
                )}
              </div>

              <div className="modal-buttons">
                <div className="button-close">
                  <Button
                    text="Cancel"
                    type="modal-close-btn"
                    onClick={(e) => handleCancel(e)}
                  />
                </div>

                <div className="button-confirm">
                  <Button
                    text="Upload"
                    type="modal-save-btn"
                    onClick={(event) => handleConfirm(event)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    [
      show,
      post?.id,
      post?.image?.url,
      inputData,
      viewStatus,
      tags,
      tag,
      handleKeyDown,
      InputDataBySelect,
      handleChangeMode,
      handleCancel,
      handleConfirm,
    ]
  );
};

export default EditPost;

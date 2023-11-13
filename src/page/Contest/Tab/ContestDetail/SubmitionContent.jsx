import Button from '../../../../components/Button/Button';
import { useAuthState } from '../../../../context/AuthContext.js';
import { handleInputChange } from '../../../../context/actions/ContestActions';
import { useGetAllUserAlbum } from '../../../../graphql/useAlbum.js';
import { useUserJoinContext } from '../../../../graphql/useContest';
import {
  useCreatePostLazy,
  useUpdatePointPostingLazy,
  useCreateTag,
} from '../../../../graphql/usePost.js';
import useUploadImageToAWS from '../../../../hooks/useUploadImageToAWS.js';
import Loading from '../../../../utils/useLoading';
import { successfullNoty } from '../../../../utils/useNotify.js';
import {
  renderAddItemBySelect,
  renderInputField,
  renderInputTags,
} from '../../../../utils/useRenderInputField.js';
import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';

const SubmitionContent = ({
  contestId,
  options,
  tags,
  setTags,
  tag,
  setTag,
  categories,
  setCategories,
  category,
  setCategory,
  album,
  setAlbum,
  albums,
  setAlbums,
  previewImage,
  selectedFile,
  handleCloseModal,
  refetch,
  contestInfoRefetch,
  contestInfor,
  dispatch,
}) => {
  console.log('contestInfor', contestInfor);
  const navigate = useNavigate();
  const { id: userId } = useAuthState();
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
  const { userJoinContest } = useUserJoinContext();

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
    [setTag, setTags, tag, tags]
  );

  const handleSelectAlbum = useCallback(() => {
    if (albums.filter((e) => e.id === album.id).length === 0) {
      setAlbums((prev) => [...prev, album]);
    }
  }, [album, albums, setAlbums]);

  const handleSelectCategory = useCallback(() => {
    if (categories.filter((e) => e.id === category.id).length === 0) {
      setCategories((prev) => [...prev, category]);
    }
  }, [categories, category, setCategories]);

  const handleConfirmUpload = useCallback(
    async (event) => {
      event.preventDefault();

      const result = await uploadImageToAWS({ selectedFile });

      try {
        await createPost({
          variables: {
            createPostData: {
              userId,
              title: contestInfor.title,
              caption: contestInfor.caption,
              contestId,
              postViewStatus: 'PUBLIC',
              aperture: contestInfor.aperture,
              lens: contestInfor.lens,
              takenWhen: contestInfor.takenWhen,
              camera: contestInfor.camera,
              focalLength: contestInfor.focalLength,
              shutterSpeed: contestInfor.shutterSpeed,
              ISO: contestInfor.iso,
              copyRight: contestInfor.copyright,
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

        await userJoinContest({
          variables: {
            userJoinContestData: {
              contestId,
              userId,
            },
          },
        });

        contestInfoRefetch();
        refetch();

        successfullNoty('upload Contest entry sucessfull!');
        handleCloseModal();
      } catch (e) {
        throw e;
      }

      if (!fetchError) {
        navigate(`/contest/${contestId}`);
      }
    },
    [
      uploadImageToAWS,
      selectedFile,
      fetchError,
      createPost,
      userId,
      contestInfor.title,
      contestInfor.caption,
      contestInfor.aperture,
      contestInfor.lens,
      contestInfor.takenWhen,
      contestInfor.camera,
      contestInfor.focalLength,
      contestInfor.shutterSpeed,
      contestInfor.iso,
      contestInfor.copyright,
      contestId,
      categories,
      albums,
      tags,
      updateLevel,
      createTag,
      userJoinContest,
      contestInfoRefetch,
      refetch,
      handleCloseModal,
      navigate,
    ]
  );

  const handleCancelUpload = useCallback(
    (event) => {
      event.preventDefault();
      handleCloseModal();
      setCategories([]);
      setCategory({
        id: 1,
        value: options[0],
      });
    },
    [handleCloseModal, setCategories, setCategory, options]
  );

  const inputData = useMemo(
    () => [
      {
        label: 'Title',
        placeholder: 'Input title for this image',
        value: contestInfor.title,
      },
      {
        label: 'Caption',
        placeholder: 'Input caption for this image',
        value: contestInfor.caption,
      },
      {
        label: 'Camera',
        placeholder: 'Input Camera',
        value: contestInfor.camera,
      },
      {
        label: 'Lens',
        placeholder: 'Input Lens',
        value: contestInfor.lens,
      },
      {
        label: 'Aperture',
        placeholder: 'Input Aperture',
        value: contestInfor.aperture,
      },
      {
        label: 'Shutter speed',
        placeholder: 'Input Shutter speed',
        value: contestInfor.shutterSpeed,
      },
      {
        label: 'Focal length',
        placeholder: 'Input Focal length',
        value: contestInfor.focalLength,
      },
      {
        label: 'ISO',
        placeholder: 'Input ISO',
        value: contestInfor.iso,
      },
      {
        label: 'Taken when',
        placeholder: 'Taken when',
        value: contestInfor.takenWhen,
      },
      {
        label: 'Copyright',
        placeholder: 'Input CopyRight',
        value: contestInfor.copyright,
      },
    ],
    [
      contestInfor.aperture,
      contestInfor.camera,
      contestInfor.caption,
      contestInfor.copyright,
      contestInfor.focalLength,
      contestInfor.iso,
      contestInfor.lens,
      contestInfor.shutterSpeed,
      contestInfor.takenWhen,
      contestInfor.title,
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
      setAlbum,
      setAlbums,
      setCategories,
      setCategory,
      userAlbums?.userAllAlbum,
    ]
  );

  return useMemo(
    () => (
      <>
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
                  item.value,
                  dispatch
                )
              )}
              <div>
                <label>Mode</label>
                <div className="post-mode">
                  <label>
                    Public
                    <div id="input-radio">
                      <input type="radio" name="mode" defaultChecked />
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

            {/* <input
              type="text"
              value={photoInfo.title}
              onChange={(e) =>
                handleInputChange(dispatch, 'title', e.target.value)
              }
            /> */}

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
        <Loading loading={isFetching} />
      </>
    ),
    [
      InputDataBySelect,
      dispatch,
      handleCancelUpload,
      handleConfirmUpload,
      handleKeyDown,
      inputData,
      isFetching,
      previewImage,
      setTag,
      setTags,
      tag,
      tags,
    ]
  );
};

export default SubmitionContent;

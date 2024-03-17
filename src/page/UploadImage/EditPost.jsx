import Modal from '../../components/Modal/Modal.jsx';
import { PostInfoReducer } from '../../context/reducer/PostReducer.js';
import { useUpdatePostInfo } from '../../graphql/usePost.js';
import { renderInputField } from '../../utils/useRenderInputField.js';
import './EditPost.scss';
import React, { useMemo, useCallback, useReducer } from 'react';

const EditPost = ({ showModal, toggleShow, post }) => {
  // console.log({ post });
  const setPostInfoValues = (receivedPost) => {
    const { title, caption, image: { imageInfoId = {} } = {} } = receivedPost;
    const {
      aperture,
      lens,
      takenWhen,
      camera,
      focalLength,
      shutterSpeed,
      ISO,
      copyRight,
    } = imageInfoId;

    return {
      title,
      caption,
      aperture,
      lens,
      takenWhen,
      camera,
      focalLength,
      shutterSpeed,
      iso: ISO,
      copyright: copyRight,
    };
  };

  const initialValues = setPostInfoValues(post || {});
  const [postInfor, dispatch] = useReducer(PostInfoReducer, initialValues);
  // console.log({ postInfor });
  const { updatePost } = useUpdatePostInfo();

  const handleEditPost = useCallback(
    async (event) => {
      event.preventDefault();
      await updatePost({
        variables: {
          data: {
            postId: post.id,
            title: postInfor.title,
            caption: postInfor.caption,
            aperture: postInfor.aperture,
            lens: postInfor.lens,
            takenWhen: postInfor.takenWhen,
            camera: postInfor.camera,
            focalLength: postInfor.focalLength,
            shutterSpeed: postInfor.shutterSpeed,
            ISO: postInfor.iso,
            copyRight: postInfor.copyright,
          },
        },
      });

      window.location.reload();
    },
    [postInfor]
  );

  const handleCancel = useCallback(() => {
    toggleShow();
  }, [toggleShow]);

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
        value: postInfor?.camera,
      },
      {
        label: 'Lens',
        placeholder: 'Input Lens',
        value: postInfor?.lens,
      },
      {
        label: 'Aperture',
        placeholder: 'Input Aperture',
        value: postInfor?.aperture,
      },
      {
        label: 'Shutter speed',
        placeholder: 'Input Shutter speed',
        value: postInfor?.shutterSpeed,
      },
      {
        label: 'Focal length',
        placeholder: 'Input Focal length',
        value: postInfor?.focalLength,
      },
      {
        label: 'ISO',
        placeholder: 'Input ISO',
        value: postInfor?.iso,
      },
      {
        label: 'Taken when',
        placeholder: 'Taken when',
        value: postInfor?.takenWhen,
      },
      {
        label: 'Copyright',
        placeholder: 'Input CopyRight',
        value: postInfor?.copyright,
      },
    ],
    [
      postInfor?.title,
      postInfor?.caption,
      postInfor?.camera,
      postInfor?.lens,
      postInfor?.aperture,
      postInfor?.shutterSpeed,
      postInfor?.focalLength,
      postInfor?.iso,
      postInfor?.takenWhen,
      postInfor?.copyright,
    ]
  );

  const renderEditContent = useCallback(() => {
    return (
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
                idx
              )
            )}
          </div>
        </div>
      </div>
    );
  }, [inputData, post?.image?.url]);

  return useMemo(
    () => (
      <Modal
        show={showModal}
        modalContent={renderEditContent()}
        handleClose={handleCancel}
        handleSavechanges={handleEditPost}
        submitText="Update"
        size="xl"
      />
    ),
    [showModal, renderEditContent, handleCancel, handleEditPost]
  );
};

export default EditPost;

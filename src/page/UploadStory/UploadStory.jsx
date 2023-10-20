import Button from '../../components/Button/Button';
import { useAuthState } from '../../context/AuthContext.js';
import { useCreateStoryLazy } from '../../graphql/useStory.js';
import { uploadImageToAWS } from '../../hooks/useUploadImageToAWS.js';
// import imageStoryHandler from '../../utils/imageStoryHandler.js';
import './UploadStory.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const QuillEditorWithImage = () => {
  const { id: userId } = useAuthState();
  const navigate = useNavigate();

  const [editorContent, setEditorContent] = useState('');
  const [storyImages, setStoryImages] = useState([]);
  const [stortTitle, setStoryTitle] = useState('')
  const editorRef = useRef(null);

  const { createStory, isFetching, fetchedData, fetchError } =
    useCreateStoryLazy();

  useEffect(() => {
    const quill = editorRef.current.getEditor();
    quill.root.addEventListener('input', handleInput);
    return () => {
      quill.root.removeEventListener('input', handleInput);
    };
  }, []);

  const handleInput = () => {
    const quill = editorRef.current.getEditor();
    setEditorContent(quill.root.innerHTML);
  };

  // https://abdullahcanakci.org/en/posts/reactquill-imageupload/
  // https://stackoverflow.com/questions/68997364/how-to-upload-image-inside-react-quill-content
  const imageStoryHandler = useCallback(() => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      let file = input.files[0];

      let result;
      if (/^image\//.test(file.type)) {
        result = await uploadImageToAWS(file);
      } else {
        console.warn('You could only upload images.');
      }

      console.log(result);

      if (result !== undefined) {
        editorRef.current
          .getEditor()
          .insertEmbed(
            editorRef.current.getEditor().getSelection(),
            'image',
            result.Location
          );

        setStoryImages((prevState) => [...prevState, result.Location]);
      }
    };
  }, []);

  const handleUploadStory = async (e) => {
    e.preventDefault();

    try {
      await createStory({
        variables: {
          createStoryData: {
            userId: userId,
            title: 'test',
            content: editorContent,
            images: storyImages,
          },
        },
      });
      toast.info('upload Story sucessfull!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      // navigate('/');
    } catch (e) {
      throw e;
    }

    // console.log(fetchError);
    if (!fetchError) {
      navigate('/explore/stories');
    }
  };

  console.log(editorContent);

  return (
    <div className="upload-story-page">
      <div className="story-title">
        <label htmlFor="">Story title</label>
        <input
          type="text"
          id="story-title-input"
          placeholder="Enter your story title"
          value={stortTitle}
          onChange={(e)=>setStoryTitle(e.target.value)}
        />
      </div>
      <ReactQuill
        ref={editorRef}
        value={editorContent}
        onChange={setEditorContent}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ align: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
            handlers: {
              image: imageStoryHandler,
            },
          },
        }}
        placeholder={'Write your story'}
        theme="snow"
      />

      <div className="btn-upload-story">
        <Button text="Upload Story" type="default3" onClick={handleUploadStory}>
          Publish Story
        </Button>
      </div>
    </div>
  );
};

export default QuillEditorWithImage;

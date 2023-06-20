import Button from '../../components/Button/ButtonCustom.jsx';
import { useAuthState } from '../../context/AuthContext.js';
import { useCreateStoryLazy } from '../../graphql/useStory.js';
import './UploadStory.css';
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';

const QuillEditorWithImage = () => {
  const { id: userId } = useAuthState();
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState('');
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

  //   const handleImageInsert = () => {
  //     const input = document.createElement('input');
  //     input.setAttribute('type', 'file');
  //     input.setAttribute('accept', 'image/*');
  //     input.click();

  //     input.onchange = () => {
  //       const file = input.files[0];
  //       if (file) {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           const dataURL = reader.result;
  //           const quill = editorRef.current.getEditor();
  //           const selection = quill.getSelection();
  //           quill.insertEmbed(selection.index, 'image', dataURL);
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     };
  //   };
  console.log(editorContent);

  const handleInput = () => {
    const quill = editorRef.current.getEditor();
    setEditorContent(quill.root.innerHTML);
  };

  const handleUploadStory = async (e) => {
    e.preventDefault();

    try {
      await createStory({
        variables: {
          createStoryData: {
            userId: userId,
            title: 'test',
            content: editorContent,
          },
        },
      });

      // navigate('/');
    } catch (e) {
      throw e;
    }

    // console.log(fetchError);
    if (!fetchError) {
      navigate('/stories');
    }
  };

  return (
    <div className="upload-story-page">
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

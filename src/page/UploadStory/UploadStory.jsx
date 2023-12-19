import Button from '../../components/Button/Button';
import { useAuthState } from '../../context/AuthContext.js';
import { useCreateStoryLazy } from '../../graphql/useStory.js';
import { uploadImageToAWS } from '../../hooks/useUploadImageToAWS.js';
import Loading from '../../utils/useLoading.js';
import { successfullNoty } from '../../utils/useNotify.js';
import {
  renderAddItemBySelect,
  renderInputTags,
} from '../../utils/useRenderInputField.js';
// import imageStoryHandler from '../../utils/imageStoryHandler.js';
import './styles.scss';
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';

const QuillEditorWithImage = () => {
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
  const navigate = useNavigate();

  const [editorContent, setEditorContent] = useState('');
  const [storyImages, setStoryImages] = useState([]);
  const [storyTitle, setStoryTitle] = useState('');
  const editorRef = useRef(null);
  const [viewStatus, setViewStatus] = useState('PUBLIC');
  console.log({ viewStatus });

  const [tags, setTags] = useState([]);
  console.log({ tags });
  const [tag, setTag] = useState({
    id: 0,
    value: '',
  });

  const [categories, setCategories] = useState([options[0]]);
  console.log({ categories });
  const [category, setCategory] = useState(options[0]);

  const isDisabledButton = useMemo(
    () => storyTitle && editorContent && tags.length,
    [editorContent, storyTitle, tags.length]
  );

  const { createStory, isFetching, fetchError } = useCreateStoryLazy();

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
        console.warn('You can only upload images.');
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

  const handleChangeMode = useCallback((viewStatus) => {
    setViewStatus(viewStatus);
  }, []);

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

  const handleSelectCategory = useCallback(() => {
    if (categories.filter((e) => e.id === category.id).length === 0) {
      setCategories((prev) => [...prev, category]);
    }
  }, [categories, category]);

  const handleUploadStory = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await createStory({
          variables: {
            createStoryData: {
              userId: userId,
              title: storyTitle,
              storyViewStatus: viewStatus,
              content: editorContent,
              images: storyImages,
              categoryId: categories.map((a) => a.id),
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
        successfullNoty('Upload story sucessfull!');
        // navigate('/');
      } catch (e) {
        throw e;
      }

      // console.log(fetchError);
      if (!fetchError) {
        navigate('/explore/stories');
      }
    },
    [
      categories,
      createStory,
      editorContent,
      fetchError,
      navigate,
      storyImages,
      storyTitle,
      tags,
      userId,
      viewStatus,
    ]
  );

  console.log(editorContent);

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
    ],
    [categories, category, handleSelectCategory, options]
  );

  return useMemo(
    () => (
      <>
        <div className="upload-story-container">
          <div className="story-title">
            <label htmlFor="">Story title</label>
            <input
              type="text"
              id="story-title-input"
              placeholder="Enter your story title"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
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
            placeholder="Write your story"
            theme="snow"
          />

          <div className="story-visibility">
            <label>Visibility</label>
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
                    onChange={() => {
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
                    onChange={() => {
                      handleChangeMode('ONLY_FOLLOWERS');
                    }}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="story-input-tags">
            {renderInputTags('Tags', tags, setTags, tag, setTag, handleKeyDown)}
          </div>
          <div className="story-input-catrgories">
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

          <div className="upload-button">
            <Button
              text="Publish Story"
              onClick={handleUploadStory}
              disabled={!isDisabledButton}
            >
              Publish Story
            </Button>
          </div>
        </div>
        <Loading loading={isFetching} />
      </>
    ),
    [
      InputDataBySelect,
      isDisabledButton,
      editorContent,
      handleChangeMode,
      handleKeyDown,
      handleUploadStory,
      imageStoryHandler,
      isFetching,
      storyTitle,
      tag,
      tags,
      viewStatus,
    ]
  );
};

export default QuillEditorWithImage;

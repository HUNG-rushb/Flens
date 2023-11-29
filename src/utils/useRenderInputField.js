// import { removeItemFromArray } from './removeItemFromArray.js';
import { handleInputChange } from '../context/actions/ContestActions.js';

export const removeItemFromArray = (removeId, array, setArray) => {
  const removeItem = array.filter((item) => item.id !== removeId);
  setArray(removeItem);
};

export const renderInputField = (label, placeholder, value, dispatch) => {
  const convertLabel = () => {
    const words = label?.split(' ');

  words[0] = words[0]?.toLowerCase();

  for (let i = 1; i < words?.length; i++) {
    words[i] = words[i]?.charAt(0).toUpperCase() + words[i]?.slice(1);
  }

  return words.join('');
  };

  switch (label) {
    case 'Aperture':
      value = value !== '' ? 'f/' + value : '';
      break;
    case 'Shutter speed':
      value = value !== '' ? value + ' s' : '';
      break;
    case 'Focal length':
      value = value !== '' ? value + ' mm' : '';
      break;
    default:
      break;
  }
  return (
    <div key={label}>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          handleInputChange(
            dispatch,
            convertLabel() || '',
            event.target.value
          )
        }
      />
    </div>
  );
};

export const renderInputTags = (
  label,
  tagArray,
  setTags,
  tag,
  setTag,
  handleKeyDown
) => {
  return (
    <div>
      <label>{label}</label>
      {tagArray?.length > 0 && (
        <div className="all-tags">
          {tagArray.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => removeItemFromArray(item.id, tagArray, setTags)}
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
              tagArray.length === 0 ? 1 : tagArray[tagArray.length - 1].id + 1,
            value: e.target.value,
          })
        }
        onKeyDown={(e) => handleKeyDown(e)}
        value={tag.value}
      />
    </div>
  );
};

export const renderAddItemBySelect = (
  label,
  Array,
  setArray,
  value,
  setValue,
  options,
  handleSelecItem
) => {
  return (
    <div className="all-categories" key={label}>
      <label>{label}</label>
      {Array.length > 0 && (
        <div className="categories-item">
          {Array?.map((item) => (
            <div
              key={item.id}
              onClick={() => removeItemFromArray(item.id, Array, setArray)}
            >
              <span id="remove-tag">X</span>
              {item.name}
            </div>
          ))}
        </div>
      )}

      <div className="sub-categories">
        <select
          value={value?.name}
          id="select-image-category"
          onChange={(e) => {
            setValue({
              name: e.target.value,
              id: options?.find((item) => item.name === e.target.value).id,
            });
          }}
        >
          {options?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>

        <div className="add-category-button">
          <button onClick={handleSelecItem}>Add</button>
        </div>
      </div>
    </div>
  );
};

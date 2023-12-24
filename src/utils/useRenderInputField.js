import { handleInputChange } from '../context/actions/InputChangeAction.js';

export const removeItemFromArray = (removeId, array, setArray) => {
  const removeItem = array.filter((item) => item.id !== removeId);
  setArray(removeItem);
};

export const renderInputField = (
  label,
  placeholder,
  value,
  dispatch,
  type,
  idx
) => {

  const convertLabel = () => {
    const words = label?.split(' ');
    words[0] = words[0]?.toLowerCase();
    for (let i = 1; i < words?.length; i++) {
      words[i] = words[i]?.charAt(0).toUpperCase() + words[i]?.slice(1);
    }
    return words.join('');
  };
  let unit = '';
  switch (label) {
    case 'Lens':
      unit = '(mm)';
      break;
    case 'Aperture':
      unit = '(f/)';
      break;
    case 'Shutter speed':
      unit = '(s)';
      break;
    case 'Focal length':
      unit = '(mm)';
      break;
    default:
      break;
  }

  const checkValue = (label, value) => {
    if (label === 'Lens' || label === 'Focal length')
      return /^[ \d]+$/.test(value);
    else if (label === 'Aperture') {
      return /^([ \d]+(\.\d*)?|\.\d+)$/.test(value);
    } else if (label === 'Shutter speed') {
      return /^([ \d]+\/\d+|\d+)$/.test(value);
    } else if (label === 'ISO') {
      return /^[ \d]+$/.test(value);
    } else return /^[a-zA-Z0-9 ]+$/.test(value);
  };

  const handleCheckInputValue = (event, label) => {
    const inputValue = event.target.value;
    if(checkValue(label, inputValue)){
      return inputValue
    }
    else {
      return event.target.value.slice(0,-1)
    }
  }

  return (
    <div key={`input-${label}-${idx}`}>
      <label>
        {label} {unit}
      </label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          handleInputChange(
            dispatch,  
            type,
            convertLabel() || '',
            handleCheckInputValue(event, label)
          )
        }
      />
    </div>
  );
};

export const renderInputFields = (
  label,
  placeholder,
  value,
  dispatch,
  type,
  idx
) => {
  const convertLabel = () => {
    const words = label?.split(' ');
    words[0] = words[0]?.toLowerCase();
    for (let i = 1; i < words?.length; i++) {
      words[i] = words[i]?.charAt(0).toUpperCase() + words[i]?.slice(1);
    }

    return words.join('');
  };

  let unit = '';
  switch (label) {
    case 'Lens':
      unit = '(mm)';
      break;
    case 'Aperture':
      unit = '(f/)';
      break;
    case 'Shutter speed':
      unit = '(s)';
      break;
    case 'Focal length':
      unit = '(mm)';
      break;
    default:
      break;
  }

  const checkValue = (label, value) => {
    if (label === 'Lens' || label === 'Focal length')
      return /^[ \d]+$/.test(value);
    else if (label === 'Aperture') {
      return /^([ \d]+(\.\d*)?|\.\d+)$/.test(value);
    } else if (label === 'Shutter speed') {
      return /^([ \d]+\/\d+|\d+)$/.test(value);
    } else if (label === 'ISO') {
      return /^[ \d]+$/.test(value);
    } else return /^[a-zA-Z0-9 ]+$/.test(value);
  };

  const handleCheckInputValue = (event, label) => {
    const inputValue = event.target.value;
    if(checkValue(label, inputValue)){
      return inputValue
    }
    else {
      return event.target.value.slice(0,-1)
    }
  }

  return (
    <div key={`inputs-${label}-${idx}`}>
      <label>
        {label} {unit}
      </label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          handleInputChange(
            dispatch,
            type,
            convertLabel() || '',
            handleCheckInputValue(event, label)
          )
        }
      />
    </div>
  );
};

export const renderInputTag = (
  label,
  tagArray,
  setTags,
  tag,
  setTag,
  handleKeyDown,
  typeCheck
) => {
  return (
    <div key={`${label}-${typeCheck}`}>
      <label>{label}</label>
      {tagArray?.length > 0 && (
        <div className="all-tags">
          {tagArray.map((item, index) => {
            return (
              <div
                key={`tag-${item.id}-${index}`}
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

export const renderInputTags = (
  label,
  tagArray,
  setTags,
  tag,
  setTag,
  handleKeyDown,
  typeCheck
) => {
  return (
    <div key={`${typeCheck}-${label}`}>
      <label>{label}</label>
      {tagArray?.length > 0 && (
        <div className="all-tags">
          {tagArray.map((item, index) => {
            return (
              <div
                key={`tags-${item.id}-${index}`}
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
  handleSelecItem,
  idx
) => {
  const uniqueKey = `${label}-${idx}`;

  return (
    <div className="all-categories" key={uniqueKey}>
      <label>{label}</label>
      {Array.length > 0 && (
        <div className="categories-item">
          {Array?.map((item, idx) => (
            <div
              key={`select-${item.id}-${idx}`}
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
          {options?.map((item, index) => {
            return (
              <option key={item.id + index + uniqueKey} value={item.name}>
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

export const renderAddItemBySelects = (
  label,
  Array,
  setArray,
  value,
  setValue,
  options,
  handleSelecItem,
  idx
) => {
  const uniqueKey = `${idx}-${label}`;

  return (
    <div className="all-categories" key={uniqueKey}>
      <label>{label}</label>
      {Array.length > 0 && (
        <div className="categories-item">
          {Array?.map((item, idx) => (
            <div
              key={`selects-${item.id}-${idx}`}
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
          {options?.map((item, index) => {
            return (
              <option key={item.id + index + uniqueKey} value={item.name}>
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

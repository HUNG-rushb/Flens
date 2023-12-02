export const initialPostInfo = {
  title: '',
  caption: '',
  aperture: '',
  lens: '',
  takenWhen: '',
  camera: '',
  focalLength: '',
  shutterSpeed: '',
  iso: '',
  copyright: '',
};

export const PostInfoReducer = (state, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'UPDATE_POST_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

export const initialContestInfo = {
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

export const ContestInfoReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CONTEST_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

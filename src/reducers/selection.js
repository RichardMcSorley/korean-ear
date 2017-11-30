const defaultState = {
  syllabeSelection: 'ㄱ ㄲ ㅋ',
  practice: true,
  multiplier: 0
}

export default(state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTION':
      return {...state, ...action.update}
    default:
      return state;
  }
};

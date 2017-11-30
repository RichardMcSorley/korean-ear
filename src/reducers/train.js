import ㄱㄲㅋ from '../data/ㄱㄲㅋ';
import ㄷㄸㅌ from '../data/ㄷㄸㅌ';
import ㅂㅃㅍ from '../data/ㅂㅃㅍ'
import ㅅㅆ from '../data/ㅅㅆ'
import ㅈㅉㅊ from '../data/ㅈㅉㅊ'

const defaultState = [
  ㄱㄲㅋ,
  ㄷㄸㅌ,
  ㅂㅃㅍ,
  ㅅㅆ,
  ㅈㅉㅊ
];

export default(state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

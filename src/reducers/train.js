import ㄱㄲㅋ from '../data/ㄱㄲㅋ';
import ㄷㄸㅌ from '../data/ㄷㄸㅌ';
import ㅂㅃㅍ from '../data/ㅂㅃㅍ'
import ㅅㅆ from '../data/ㅅㅆ'
import ㅈㅉㅊ from '../data/ㅈㅉㅊ'
import FlashCards from '../lib/ouicards';
const allSets = [
  ㄱㄲㅋ,
  ㄷㄸㅌ,
  ㅂㅃㅍ,
  ㅅㅆ,
  ㅈㅉㅊ
];
let setOfCards = [];
allSets.forEach((state)=>{
  setOfCards = setOfCards.concat(state.syllables);
})
let flashCards = new FlashCards();
// if bucket is empty then load into Memory
if (flashCards.currentBucket === null || flashCards.currentBucket.length === 0){
  //console.log('this.props.questions', this.props.questions);
  flashCards.load(setOfCards);
  console.log('saved');
}else{
  console.log('loaded');
}

const defaultState = {
  sets: allSets,
  currentBucket: flashCards.currentBucket,
  bucketA: flashCards.bucketA,
  bucketB: flashCards.bucketB,
  bucketC: flashCards.bucketC,
  flashcards: flashCards.flashcards,
  currentCard: flashCards.next()
}


console.log('defaultState', defaultState);

export default(state = defaultState, action) => {
  switch (action.type) {
    case 'SKIP_CARD':
      return {...state, currentCard: flashCards.next()}
    case 'WRONG_ANSWER':
      flashCards.wrong()
      return {...state, currentCard: flashCards.next()}
    case 'CORRECT_ANSWER':
      flashCards.correct()
      return {...state, currentCard: flashCards.next()}
    default:
      return state;
  }
};

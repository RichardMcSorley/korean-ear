export default class OuiCards {
  constructor() {
    this.currentBucket = null;
    this.flashcards = null;
    this.bucketA = null;
    this.bucketB = null;
    this.bucketC = null;
    this.counter = 1;
    this._getfromLS()
  }

  // Load an array of {question, answer}
  load = (array) => {
    this.flashcards = this._shuffleArray(array);
    this._resetBuckets();
  }

  _shuffleArray = (array) =>{
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
  // return next question
  next = () => {
    let newQuestion,
      bigInterval = Math.ceil(this.flashcards.length / 3) + 1,
      smallInterval = Math.ceil(this.flashcards.length / 6) + 1;

    // Show an answer from bucket C once every bigInterval
    // So long as Bucket C it's not empty
    if (this.counter % bigInterval === 0 && this.bucketC.length !== 0) {
      newQuestion = this._getQuestion(this.bucketC);
      this.currentBucket = this.bucketC;

      // Show an answer from bucket B once every smallInterval
      // So long as Bucket B it's not empty
    } else if (this.counter % smallInterval === 0 && this.bucketB.length !== 0) {
      newQuestion = this._getQuestion(this.bucketB);
      this.currentBucket = this.bucketB;

      // Show an answer from Bucket A, so long as it's not empty
    } else if (this.bucketA.length !== 0) {
      newQuestion = this._getQuestion(this.bucketA);
      this.currentBucket = this.bucketA;

      // Show an answer from Bucket B, so long as it's not empty
    } else if (this.bucketB.length !== 0) {
      newQuestion = this._getQuestion(this.bucketB);
      this.currentBucket = this.bucketB;

      // Show a question from Bucket C, so long as it's not empty
    } else if (this.bucketC.length !== 0) {
      newQuestion = this._getQuestion(this.bucketC);
      this.currentBucket = this.bucketC;
    } else {
      console.log('There was a serious problem with this. You should never see ');
    }

    // Reset this.counter if it's greater than flashcard count, otherwise ++ it
    this.counter >= this.flashcards.length
      ? this.counter = 1
      : this.counter++;
    return newQuestion;
  }
  // Mark Qustion as correct
  correct = () => {
    if (this.currentBucket === this.bucketA) {
      this._moveQuestion(this.bucketA, this.bucketB);
    } else if (this.currentBucket === this.bucketB) {
      this._moveQuestion(this.bucketB, this.bucketC);
    } else if (this.currentBucket === this.bucketC) {
      this._moveQuestion(this.bucketC, this.bucketC);
    } else
      console.log('Hmm, you should not be here.');
    this._saveToLS();
  }
  // Mark Qustion as wrong
  wrong = () => {
    this._moveQuestion(this.currentBucket, this.bucketA);
    this._saveToLS();
  }

  _moveQuestion = (fromBucket, toBucket) => {
    toBucket.push(fromBucket.shift());
  }
  _getQuestion = (bucket) => {
    // Prevent from looping thru an empty bucket
    if ( !bucket || bucket.length === 0 ) {
      console.log("You can't load an empty set of questions.");
        return
      }

    //this._saveToLS()
    return this._buildQuestion(bucket[0]);
  }

   _buildQuestion = ({answer, question, ...rest}) => {
    return {...rest, question: question, answer: answer};
  }

  _saveToLS = () => {
    localStorage.flashcards = JSON.stringify(this.flashcards);
    localStorage.bucketA = JSON.stringify(this.bucketA);
    localStorage.bucketB = JSON.stringify(this.bucketB);
    localStorage.bucketC = JSON.stringify(this.bucketC);
  }

  _getfromLS = () => {
    this.flashcards = JSON.parse(localStorage.flashcards || '[]');
    this.bucketA = JSON.parse(localStorage.bucketA || '[]');
    this.bucketB = JSON.parse(localStorage.bucketB || '[]');
    this.bucketC = JSON.parse(localStorage.bucketC || '[]');
    this.currentBucket = this.bucketA.length
      ? this.bucketA
      : this.bucketB.length
        ? this.bucketB
        : this.bucketC.length
          ? this.bucketC
          : [];

    this.counter = 1;
    return {flashcards: this.flashcards, bucketA: this.bucketA, bucketB: this.bucketB, bucketC: this.bucketC};
  }

  _resetBuckets = () => {
    this.bucketA = this.flashcards.slice(0);
    this.currentBucket = this.bucketA;
    this.bucketB = [];
    this.bucketC = [];
    this.counter = 1;
    this._saveToLS();
  }

}

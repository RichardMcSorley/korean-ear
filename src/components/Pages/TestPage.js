import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import {connect} from 'react-redux'
import PlayAudio from '../PlayAudio'

const styles={
          button: {
            maxWidth: '30%',
            margin: 5
          },
          contentContainer: {
            display: 'flex',
             height: '100%',
              flexWrap: 'wrap'
              },
              text: {
                color: 'white'
              }
}
export class PracticePage extends Component{
constructor(props){
  super(props)
  const syllables = {...this.props.syllables}
  this.state = {
    questions: this.buildLargerArray(this.props.syllables, 20),
    index: 0,
    correct: 0,
    finished: false
  }

}
buildLargerArray = (array, length) =>{
  let randomArray = this.shuffleArray(array);
  for (let i = 0; i < length; i++ ){
    if(randomArray[i] && array.length < length){
      array.push(randomArray[i])
    }
  }
  return this.shuffleArray(array);
}
shuffleArray = (array) =>{
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

handleSelectAnswer = (userSelection)=>{
  if(this.state.index < this.state.questions.length){

    if(userSelection === this.state.questions[this.state.index].answer){
      console.log('correct');
      this.setState((prev)=>({correct: prev.correct + 1, index: prev.index + 1}))
      //correct
    }else{
      console.log('incorrect');
      this.setState((prev)=>({index: prev.index + 1}))
      //incorrect
    }
  } else {
    console.log('finished');
    this.setState((prev)=>({ correct: 0, index: 0, finished: true}))
  }
  this.setState((prev)=>({ questions: prev.questions}))
}
renderCorrectColor= (userSelection)=>{
  if (this.state.questions[this.state.index] && userSelection === this.state.questions[this.state.index].answer){
    return "green"
  }
  else return "red"
}
  render(){
    const { selection, multiplier } = this.props;
    console.log('multiplier', this.props.multiplier);
    return (
        <Header>
          {this.state.finished ? (
            <div style={styles.text}>You did it</div>
          ) : (
            <div style={styles.contentContainer}>
              { selection.map((item)=>(

                <FlatButton
                  key={item}
                  onClick={()=>this.handleSelectAnswer(item)}
                  style={styles.button}
                  backgroundColor='#0094FF'
                  hoverColor={this.renderCorrectColor(item)}
                  rippleColor={this.renderCorrectColor(item)}
                  label={item}
                  fullWidth={true}
                   />
              ))}
              <PlayAudio
                playTimes={multiplier}
                folder={selection.join('')}
                filename={this.state.questions[this.state.index].displayText + '.mp3'}
              />
              <p style={styles.text}>correct: {this.state.correct}</p>
            </div>
          ) }


        </Header>
    );
  }
}

const mapStateToProps = (state) =>{
  //filter the
   const filteredTrain = state.train.filter((item)=>{
     if(item.title === state.selection.syllabeSelection){
       return true
     }
   })
  return {
    // We need only one set of syllables here
    syllables: filteredTrain[0].syllables,
    selection: state.selection.syllabeSelection.split(' '),
    multiplier: state.selection.multiplier
  }
}

export default connect(mapStateToProps)(PracticePage);

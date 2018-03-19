import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import Header from '../Header'
import {connect} from 'react-redux'
import Container from '../Container'
import TestButton from '../TestButton'
import { skipCard, wrongAnswer, correctAnswer } from '../../actions/train';
import moment from 'moment'
import _ from 'underscore'
import PlayAudio from '../../lib/PlayAudio';
const nextSession = JSON.parse(localStorage.nextSession || null);
const reviewed = JSON.parse(localStorage.reviewed || 0);
const lastSessionQ = JSON.parse(localStorage.lastSessionQ || null);
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const styles={
  button: {
    position: 'absolute',

  },
  text: {
    color: 'white'
  },
  container:{

  }
}
export class PracticePage extends Component{
constructor(props){
  super(props)
  this.state = {
    nextSession: nextSession,
    reviewed: reviewed,
    lastSessionQ: lastSessionQ || {},
    audio: new PlayAudio()
  }
}

handleSelectAnswer = (e,userSelection)=>{
  e.persist();
    if(userSelection === this.props.currentCard.answer){
      this.props.currentCard.correct = true;
      console.log('correct');
      this.setState((prev)=>{

        let { answer, question, ...rest } = this.props.currentCard
        prev.lastSessionQ[question] = { ...rest, answer }
        if(!prev.lastSessionQ[question].value){
          prev.lastSessionQ[question].value = { correct: 1, incorrect: 0 };
        }else{
          console.log('value exists',);
          prev.lastSessionQ[question].value = { correct: prev.lastSessionQ[question].value.correct + 1, incorrect: prev.lastSessionQ[question].value.incorrect };
        }
        let update = {reviewed: prev.reviewed + 1, lastSessionQ: {...prev.lastSessionQ}}
        return this.saveToLS(update)
      })
      setTimeout(()=>{
        this.props.correctAnswer();
      }, 1000)
    }else{
      this.props.currentCard.correct = false;
      this.setState((prev)=>{
        let { answer, question, ...rest } = this.props.currentCard
        prev.lastSessionQ[question] = { ...rest, answer }
        if(!prev.lastSessionQ[question].value){
          prev.lastSessionQ[question].value = { correct: 0, incorrect: 1 };
        }else{
          console.log('value exists',);
          prev.lastSessionQ[question].value = { correct: prev.lastSessionQ[question].value.correct , incorrect: prev.lastSessionQ[question].value.incorrect + 1 };
        }
        let update = {reviewed: prev.reviewed + 1, lastSessionQ: {...prev.lastSessionQ}}
        return this.saveToLS(update)
      })
      console.log('incorrect');
      setTimeout(()=>{
        this.props.wrongAnswer();
      }, 1000)
    }
}

renderItems = ()=>{
  this.state.audio.setSrc(`/assets/audio/${this.props.options.join('')}/${this.props.currentCard.question}.mp3`).play()
  return this.props.options.map((item)=>(
<Paper
  style={styles.button}
  key={item}
  zDepth={3}

  >
  <TestButton
    onClick={(e)=>this.handleSelectAnswer(e,item)}
    className="button"
    backgroundColor='#0094FF'
    rippleColor={this.renderCorrectColor(item)}
    hoverColor={this.renderCorrectColor(item)}
    label={item}
    fullWidth={true}
     />

</Paper>
  ))
}
renderBoard = ()=>{
  return (
    <TransitionGroup component="test" className="page-test">
      <CSSTransition key={this.props.currentCard.answer} timeout={{ enter: 800, exit: 800 }} classNames="test-questions">
        <div className="test-bed">
          {this.renderItems()}
          <Paper
            zDepth={3}>
            <FlatButton className="button" label="Repeat Audio" onClick={()=>this.state.audio.setSrc(`/assets/audio/${this.props.options.join('')}/${this.props.currentCard.question}.mp3`).play()} backgroundColor='#0094FF' />
          </Paper>
          {this.handleShouldEnd()}
        </div>
    </CSSTransition>
  </TransitionGroup>
  )
}
handleBackButton =()=>{
history.back()
}
saveToLS = (object)=>{
  Object.keys(object)
  .forEach( (key) => {
    localStorage[key] =  JSON.stringify(object[key]);
  });
  return object
}
renderCorrectColor= (userSelection)=>{
  if (this.props.currentCard.answer === userSelection){
    return "green"
  }
  else return "red"
}
handleEndofCards = () =>{
    //save Timestamp 24 hours from now
    let update = {nextSession: moment().endOf('day').format()};
    this.setState((prev)=>(this.saveToLS(update)))
}
handleShouldEnd = () =>{
  if(Object.keys(this.state.lastSessionQ).length > 14){
    // set timestamp for 15 minutes
    let update = {nextSession: moment().add(15, 'minutes').format()}
    this.setState((prev)=>(this.saveToLS(update)))
  }
}
renderNormally=()=>{

      return (
        <div style={styles.container}>
          {this.props.currentCard === undefined ? (
            <div>
              <Paper
                zDepth={3}>
                <FlatButton className="button" label="Continue Studying" onClick={this.handleContinueStudying} backgroundColor='#0094FF' />
              </Paper>
            {
              this.handleEndofCards()
            }
            </div>
          ) : this.renderBoard()
          }
        </div>

      );
}
handleContinueStudying = ()=>{
  let update = { nextSession: null, reviewed: 0, lastSessionQ: {}}
  this.props.skipCard();
  this.setState((prev)=>(this.saveToLS(update)))
}
renderEnd=()=>{

      return (
        <div>
          <div>{Object.keys(this.state.lastSessionQ).length} Reviewed</div>
          <div>{this.props.train.bucketA.length} To Review</div>
          <div>
            You should take a break, come back {moment(this.state.nextSession).startOf('minute').fromNow()}
            <Paper
              zDepth={3}>
              <FlatButton className="button" label="Continue Studying" onClick={this.handleContinueStudying} backgroundColor='#0094FF' />
            </Paper>
          </div>
          <div>
            {Object.keys(this.state.lastSessionQ).map((key)=>(
              <p key={key}>{key} - {this.state.lastSessionQ[key].answer} - Correct: {this.state.lastSessionQ[key].value.correct} Incorrect: {this.state.lastSessionQ[key].value.incorrect}</p>
            ))}
          </div>
        </div>
      );
}
render(){
  // if(Timestamp === null || timestamp in past){
  // displayNormally
  // }else{
  // displayPleaseWait with timestamp of how long to wait plus option to continue
  // }
  //

  return (
    <Header onBackButtonClick={this.handleBackButton} title="Test">
      <Container>
        {
          moment(this.state.nextSession).isAfter() ? this.renderEnd() : this.renderNormally()
        }
      </Container>

    </Header>
  )

  }
}

const mapStateToProps = (state) =>{

   let allQuestions = [];
   state.train.sets.forEach((set)=>{
     allQuestions = allQuestions.concat(set.syllables);
   })
   let options = [];
   if(state.train.currentCard){
     options = state.train.currentCard.options.split(' ')
   }
  return {
    train: state.train,
    currentCard: state.train.currentCard,
    options: options
  }
}
const mapDispatchToProps = ((dispatch)=>{
  return {
    skipCard: ()=>dispatch(skipCard()),
    wrongAnswer: ()=>dispatch(wrongAnswer()),
    correctAnswer: ()=>dispatch(correctAnswer())
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(PracticePage);

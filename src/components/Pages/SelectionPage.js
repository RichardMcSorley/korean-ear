import { connect } from "react-redux";
import React from "react";
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import Link from 'react-router'
import {history } from '../../routers/AppRouter'
import {update } from '../../actions/selection'
import Container from '../Container'
import Paper from 'material-ui/Paper'
const styles={

          button: {
            margin: '10px',
            width: '100%'
          },
}

const handleGoto = (item, props)=>{
  let syllabeSelection = item.title
  console.log('syllabeSelection', syllabeSelection);
  props.update({syllabeSelection})
  if(props.practice) history.push('/practice')
  else history.push('/test')

}
const handleBackButton =()=>{
history.goBack()
}

export const HomePage = (props) => (
    <Header onBackButtonClick={handleBackButton} title="Select Syllables">
      <Container>
        {props.train.map((item)=>(
          <Paper zDepth={3} style={styles.button}>
            <FlatButton className="button" onClick={()=>handleGoto(item, props)} backgroundColor="#0094FF" rippleColor="" label={item.title} fullWidth={true} />

          </Paper>
                  ))}
      </Container>
    </Header>
);
const mapStateToProps = (state) =>{
  return {
    train: state.train.sets,
    practice: state.selection.practice
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    update: (selection)=>dispatch(update(selection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

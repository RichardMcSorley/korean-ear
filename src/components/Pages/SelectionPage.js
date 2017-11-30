import { connect } from "react-redux";
import React from "react";
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import Link from 'react-router'
import {history } from '../../routers/AppRouter'
import {update } from '../../actions/selection'

const styles={

          button: {
            margin: '10px'
          }
}

const handleGoto = (item, props)=>{
  let syllabeSelection = item.title
  console.log('syllabeSelection', syllabeSelection);
  props.update({syllabeSelection})
  if(props.practice) history.push('/practice')
  else history.push('/test')

}

export const HomePage = (props) => (
    <Header>
      {props.train.map((item)=>(
        <FlatButton onClick={()=>handleGoto(item, props)} style={styles.button} backgroundColor="#0094FF" rippleColor="" label={item.title} fullWidth={true} />
      ))}
    </Header>
);
const mapStateToProps = (state) =>{
  return {
    train: state.train,
    practice: state.selection.practice
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    update: (selection)=>dispatch(update(selection))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

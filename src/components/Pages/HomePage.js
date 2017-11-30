import { connect } from "react-redux";
import React from "react";
import {update} from '../../actions/selection'
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import { history } from '../../routers/AppRouter'

const styles={

          button: {
            margin: '10px'
          }
}
const handleGoto = (multiplier, practice, props) =>{

  props.update({multiplier, practice})
  history.push('/select')

}
export const HomePage = (props) => (

  <div>
    <Header>
      <div>
        <FlatButton style={styles.button} onClick={()=>handleGoto(0, true, props)} backgroundColor="#0094FF" rippleColor="" label="연습 PRACTICE" fullWidth={true} />
        <FlatButton style={styles.button} onClick={()=>handleGoto(3, false, props)} backgroundColor="#F00" rippleColor="" label="초 BEGINNER" fullWidth={true} />
        <FlatButton style={styles.button} onClick={()=>handleGoto(2, false, props)} backgroundColor="#FFD800" rippleColor="" label="중 INTERMEDIATE" fullWidth={true} />
        <FlatButton style={styles.button} onClick={()=>handleGoto(1, false, props)} backgroundColor="#B6FF00" rippleColor="" label="고 ADVANCED" fullWidth={true} />

      </div>
  </Header>


  </div>
);

const mapDispatchToProps = ((dispatch)=>{
  return {
    update: (selection)=>dispatch(update(selection))
  }
})

export default connect(undefined, mapDispatchToProps)(HomePage);

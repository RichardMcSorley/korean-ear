import {connect} from "react-redux";
import React from "react";
import {update} from '../../actions/selection'
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import {history} from '../../routers/AppRouter'
import Container from '../Container'
import Paper from 'material-ui/Paper'
const styles = {

  button: {
    margin: '10px',
    width: '100%'
  }
}
const handleGoto = (multiplier, practice, props) => {

  props.update({multiplier, practice})
  history.push('/select')

}

export const HomePage = (props) => (<div>
  <Header title="My Korean Ear">
    <Container>
      <Paper zDepth={3} style={styles.button}>
        <FlatButton className="button button--homepage" onClick={() => handleGoto(0, true, props)} backgroundColor="#0094FF" label="연습 Practice" fullWidth={true}/>
      </Paper>
      <Paper style={styles.button} zDepth={3}>

        <FlatButton className="button button--homepage" onClick={() =>history.push('/test')} backgroundColor="#F00" label="Review" fullWidth={true}/>
      </Paper>

    </Container>
  </Header>

</div>);

const mapDispatchToProps = ((dispatch) => {
  return {
    update: (selection) => dispatch(update(selection))
  }
})

export default connect(undefined, mapDispatchToProps)(HomePage);

import {connect} from "react-redux";
import React from "react";
import {update} from '../../actions/selection'
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import {history} from '../../routers/AppRouter'
import Container from '../Container'
import Paper from 'material-ui/Paper'
import {Link} from 'react-router-dom';
const styles = {

  button: {
    margin: '10px',
    width: '100%'
  }
}

export const HomePage = (props) => (<div>
  <Header title="My Korean Ear">
    <Container>
      <Paper zDepth={3} style={styles.button}>
      <Link to="/practice">
        <FlatButton className="button button--homepage" backgroundColor="#0094FF" label="연습 Practice" fullWidth={true}/>
      </Link>

      </Paper>
      <Paper style={styles.button} zDepth={3}>
        <Link to="/test">
            <FlatButton className="button button--homepage" backgroundColor="#F00" label="Review" fullWidth={true}/>
        </Link>

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

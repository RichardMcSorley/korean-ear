import React from "react";
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import {connect} from 'react-redux'
import PlayAudio from '../PlayAudio'
import Container from '../Container'
import Paper from 'material-ui/Paper'

const styles = {
  button: {
    margin: 5
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}
export class PracticePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filename: null
    }
  }
  handleUpdateFilename = (item) => {

    this.setState(() => ({filename: item.question}))
  }
  handleBackButton = () => {
    history.back()
  }

  renderItems = () => {
    return this.props.syllables.map((item) => (
      <Paper key={item.question} style={styles.button} zDepth={3}>
      <FlatButton className="button" onClick={() => this.handleUpdateFilename(item)} backgroundColor="#0094FF" rippleColor="" label={item.question}/>
    </Paper>))
  }
  render() {
    return (<Header onBackButtonClick={this.handleBackButton} title="Practice">
      <Container>
        <div style={styles.container}>
          {this.renderItems()}
        </div>

      </Container>
      <PlayAudio playTimes={1} folder={this.props.selection.join('')} filename={this.state.filename + '.mp3'}/>
    </Header>)
  }
}

const mapStateToProps = (state) => {
  const filteredTrain = state.train.sets.filter((item) => {
    if (item.title === state.selection.syllabeSelection) {
      return true
    }
  })
  console.log('state.selection.syllabeSelection', state.selection.syllabeSelection);
  return {syllables: filteredTrain[0].syllables, selection: state.selection.syllabeSelection.split(" ")}
}

export default connect(mapStateToProps)(PracticePage);

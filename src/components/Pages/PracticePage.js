import React from "react";
import FlatButton from 'material-ui/FlatButton'
import Header from '../Header'
import {connect} from 'react-redux'
import PlayAudio from '../PlayAudio'

const styles={
          button: {
            margin: '5px'
          },
          contentContainer: {
            display: 'flex',
             height: '100%',
              flexWrap: 'wrap'
              },
}
export class PracticePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      filename: null
    }
  }
  handleUpdateFilename = (item) =>{

    this.setState(()=>({filename: item.displayText}))
  }
  render(){
    return (
      <Header>
        <div style={styles.contentContainer}>
          {this.props.syllables.map((item)=>(
            <FlatButton
              key={item.displayText}
              style={styles.button}
              onClick={()=>this.handleUpdateFilename(item)}
              backgroundColor="#0094FF"
              rippleColor=""
              label={item.displayText}
               />
          ))}
        </div>
        <PlayAudio
          playTimes={1}
          folder={this.props.selection.join('')}
          filename={this.state.filename + '.mp3'}
        />
      </Header>
    )
  }
}

const mapStateToProps = (state) =>{
 const filteredTrain = state.train.filter((item)=>{
   if(item.title === state.selection.syllabeSelection){
     return true
   }
 })
 console.log('state.selection.syllabeSelection', state.selection.syllabeSelection);
  return {
    syllables: filteredTrain[0].syllables,
    selection: state.selection.syllabeSelection.split(" ")
  }
}

export default connect(mapStateToProps)(PracticePage);

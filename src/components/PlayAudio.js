import React from 'react';
import Sound from 'react-sound';

export default class PlayAudio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playPosition: 1,
      position: 0,
      volume: 100,
      loop: false,
      playStatus: Sound.status.PLAYING
    };
  }
handleSongFinishedPlaying = () =>{
  if(this.state.playPosition < this.props.playTimes)
  this.setState((prev)=>({playPosition: prev.playPosition + 1}))
}
  render() {
    const { volume, loop } = this.state;

    return (
      <div>
          <Sound
            url={'assets/audio/'+ this.props.folder + '/' + this.props.filename}
            autoLoad={true}
            playStatus={this.state.playStatus}
            playFromPosition={300}
            onFinishedPlaying={this.handleSongFinishedPlaying}
          />
      </div>
    );
  }

}

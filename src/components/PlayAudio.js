import React from 'react';
import Sound from 'react-sound';

export default class PlayAudio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      volume: 100,
      loop: false,
      playStatus: Sound.status.PLAYING
    };
  }

  render() {
    const { volume, loop } = this.state;

    return (
      <div>
          <Sound
            url={'assets/audio/'+ this.props.folder + '/' + this.props.filename}
            autoLoad={true}
            playStatus={this.state.playStatus}
          />
      </div>
    );
  }

}

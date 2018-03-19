
export default class PlayAudio {
  constructor() {
    this._audioObj = new Audio();
    this._audioObj.src = ""
  }
  setSrc = (path) =>{
    this._audioObj.src = path;
    return this._audioObj
  }
}

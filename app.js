// Each key is paired to a web-hosted audio sound file, with keyCodes identified for each letter-sound object in the sounds array. 
const firstSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

// event e by which audio is paired to key id but also conditioned to play at start, completing with a handler call for adding/removing class to key and a BOM display update with latter method.
const keyPlaySound = (e) =>{
let audio= document.getElementById(e.key.toUpperCase());
if(audio) {
  audio.play();
  audio.currentTime=0;
  handleClassesKey(e);
  window.updateDisplayFromOutside.updateDisplayKey(e);
  }
}

// draws upon value of letter argument to clarify the clickedButton key to  play or reset; triggers next handler for button to add/remove class
const clickPlaySound=({letter})=>{
    let clickedButton = document.getElementById(letter.key);
    if (clickedButton && clickedButton.paused){
        clickedButton.play();
    } else if (clickedButton){
        clickedButton.currentTime=0;
    }
      handleClassesButton({letter});
}
//FOR CLICK STYINGS//
// climbs to parent container for "pressed" class to effect styles with keyTrigger i.e. mouseclick
const handleClassesButton = ({letter}) => {
  let clicked = document.getElementById(letter.key).parentElement;
  clicked.classList.add('pressed');
  setTimeout(() => { clicked.classList.remove('pressed') }, 200);
}
// climbs to parent container for "pressed" class to effect styles with keypress i.e. letter type
const handleClassesKey = (e) => {
  let element = document.getElementById(e.key.toUpperCase()).parentElement;
  element.classList.add('pressed');
  setTimeout(() => {element.classList.remove('pressed')}, 100);
} 


//listening for keypress to play designated sound or default not playing sound
window.addEventListener('keypress', keyPlaySound, false);

class DrumMachine extends React.Component{
  constructor(props){
    super(props);
    window.updateDisplayFromOutside = this;
    this.state={ 
      displayText: "Click a key to play a sound"
    };
  }
  //updates for programmed mousclicks 
  updateDisplayButton({letter}){
    this.setState({ 
      displayText: "Playing " + letter.key
    })
  }
// updates for programmed letter typing
  updateDisplayKey(e){
    this.setState({
      displayText: "Playing " + e.key.toUpperCase()
    })
  }

  // renders place for the app 'page', returning event functions all tied together in sounds.map() to apply to each "letter" object of the "sounds" array, with default classNames assigned to each of their divs, a display of their letter selection as key, and audio tag with src url, class and id designations.


  render() {
    return (
        <div id="container">
            <div id="display">
            <h1>{this.state.displayText}</h1>
            </div>
            <div id="drum-machine">

                {
                    firstSoundsGroup.map(
                        (letter) => {
                            return <div className="drum-pad unpressed" key={letter.keyCode} onClick={() => {clickPlaySound({letter}); { this.updateDisplayButton({letter}) } }}>
                                {letter.key}
                                <audio src={letter.url} className="clip" id={letter.key} />
                            </div>
                        }
                    )
                }
            </div>
        </div>
    )
  }
}
//returning DrumMachine component from App component. No added code = no added props baseline, just replete Component reference.
class App extends React.Component{
  render(){
    return(
        <DrumMachine />
    );
  }
}


ReactDOM.render(<App />,document.getElementById("root"));
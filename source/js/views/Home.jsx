import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { storeText,
         changeInputText,
         shiftArrayElement,
         clearInputText } from 'actions/app';

// components
import RaceTextView from '../components/global/RaceTextView';

// services
import { RaceServices } from '../services/race.services'

@connect(state => ({
  raceText: state.race.get('raceText'),
  inputText: state.race.get('inputText'),
  textArray: state.race.get('textArray'),
  completedWords: state.race.get('completedWords'),
  wordsCount: state.race.get('wordsCount')
}))
export default class Home extends Component {
  static propTypes = {
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      fine: false,
      timer: 3,
      startTS: '',
      wpmCount: ''
    }
  }
  
  countDown = '';

  componentDidMount() {
    // this.getRandomText();
  }


  render() {
    const {
      raceStore,
    } = this.props;

    return (
      <div className='Home'>
        {/* {
          (this.state.timer) &&
            <div>Starts in <span>{this.state.timer}</span></div>
        } */}
        <div style={{"fontSize":"2rem","color":(this.props.textArray && this.props.textArray[0]) && this.props.textArray[0].startsWith(this.props.inputText) ? "green" : "red","marginBottom":"2rem"}}>
          {
            //prints ok if first array of element starts with entering text
            this.props.textArray.length > 0 &&
              (this.props.textArray && this.props.textArray[0]) &&
                this.props.textArray[0].startsWith(this.props.inputText) ?
            'ok'
          :
            'not ok'
          }
        </div>

        <div className="race-text-container">
            <RaceTextView text={this.props.raceText} />
          
          <div className="text-input-container">
            <input value={this.props.inputText} className="text-input" onKeyPress={this.handleSpaceBar} onChange={this.handleTextChange}/>
          </div>
          <div>
            {/* shows completed words */}
            <span style={{color:'red'}}>{ this.props.completedWords.map(word => word + ' ') }</span>
          </div>
          {
            this.state.wpmCount &&
              <div>
                <h4>Words per minute</h4>
                <span>{this.state.wpmCount} wpm</span>
              </div>
          }
        </div>
      </div>
    );
  }

  // change value in reducer according to input
  handleTextChange = (event) => {
    const { dispatch } = this.props;
    
    dispatch(changeInputText(event.target.value));
  }

  // if spacebar is triggered, text check is done
  handleSpaceBar = (event) => {
    if(event.key == ' '){
      
      if(this.props.inputText.trim() == this.props.textArray[0]) {
        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation();
        const { dispatch } = this.props;

        dispatch(shiftArrayElement(this.props.inputText));
        dispatch(clearInputText());

        if(this.props.textArray.length == 0) {
          this.showWPM();
        }
      }
    }
  }

  startCountDown() {
    this.setState((prevState) => {
      timer: prevState.timer - 1;
    }, () => {
      if(this.state.timer == 0) {
        window.clearInterval(this.countDown);
        this.startWPMCount();
      }
    })
  }

  // set starting timestamp
  startWPMCount() {
    this.setState({ startTS: new Date().getTime() });
  }

  getRandomText() {
    RaceServices.getRandomText()
    .then((data) => {
      const { dispatch } = this.props;

      dispatch(storeText(data.text_out));
      this.startWPMCount();
      // this.countDown = window.setInterval(this.startCountDown(), 1000);
    })
    .catch((error) => {
        console.log(error)
    })
  }

  showWPM() {
    const currentTS = new Date().getTime();

    this.setState({
      wpmCount: (this.props.wordsCount / (Math.abs((currentTS - this.state.startTS) / 60000))).toFixed(3)
    })
  }
}

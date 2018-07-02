import React, { Component } from 'react';
import Parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeTextArray } from '../../actions/app';
 
// import htmlToJson from 'html-to-json';

@connect(state => ({
    raceText: state.race.get('raceText'),
    textArray: state.race.get('textArray'),
    completedWords: state.race.get('completedWords')
  }))
class RaceTextView extends Component {
    static propTypes = {
        // from react-redux connect
        dispatch: PropTypes.func
    }

    componentDidMount() {
        if(this.props.text) this.getParsedTextArray()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.raceText && this.props.raceText) {
            this.getParsedTextArray();
        }
    }

    comp

    render() {
        return (
            <div className="race-text-view-container" ref="textView">
                {Parser(this.props.raceText)}
            </div>
        );
    }

    //parse the props text and store it as array of words to reducer
    getParsedTextArray() {
        const { dispatch } = this.props;

        dispatch(storeTextArray(this.refs['textView'].innerText.split(/\s/g)));
    }
}

export default RaceTextView;
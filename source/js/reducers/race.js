import { Map } from 'immutable';

import { STORE_TEXT,
         CHANGE_INPUT_TEXT,
         STORE_TEXT_ARRAY,
         SHIFT_ARRAY_ELEMENT,
         CLEAR_INPUT_TEXT } from 'actions/app';

const initialState = Map({
  raceText: 'Lorem ipsum gravida quam fermentum ',
  inputText: '',
  textArray: [],
  completedWords: [],
  wordsCount: 0
});

const actionsMap = {
  [STORE_TEXT]: (state, action) => {

    return state.merge(Map({
      raceText: action.payload
    }));
  },
  [CHANGE_INPUT_TEXT]: (state, action) => {
      const inputText = action.payload;

      return state.merge(Map({
          inputText
      }))
  },
  [STORE_TEXT_ARRAY]: (state, action) => {
      return state.merge(Map({
          textArray: action.payload,
          wordsCount: action.payload.length
      }))
  },
  [SHIFT_ARRAY_ELEMENT]: (state, action) => {
      const completedWords = [...state.get('completedWords'), state.get('textArray').shift()];

      return state.merge(Map({
          textArray: state.get('textArray'),
          completedWords,
      }))
  },
  [CLEAR_INPUT_TEXT]: (state) => {
      return state.merge(Map({
          inputText: ''
      }))
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

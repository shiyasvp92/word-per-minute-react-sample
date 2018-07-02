import { Map } from 'immutable';


const initialState = Map({
  counter: 0,
});

const actionsMap = {
  
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}

export const STORE_TEXT = 'STORE_TEXT';
export const CHANGE_INPUT_TEXT = "CHANGE_INPUT_TEXT";
export const STORE_TEXT_ARRAY = 'STORE_TEXT_ARRAY';
export const SHIFT_ARRAY_ELEMENT = 'SHIFT_ARRAY_ELEMENT';
export const CLEAR_INPUT_TEXT = 'CLEAR_INPUT_TEXT';

export function storeText(text) {
  return {
    type: STORE_TEXT,
    payload: text
  }
}

export function changeInputText(textValue) {
  return {
    type: CHANGE_INPUT_TEXT,
    payload: textValue
  }
}

export function storeTextArray(textArray) {
  return {
    type: STORE_TEXT_ARRAY,
    payload: textArray
  }
}

export function shiftArrayElement(inputText) {
  return {
    type: SHIFT_ARRAY_ELEMENT,
    payload: inputText
  }
}

export function clearInputText() {
  return {
    type: 'CLEAR_INPUT_TEXT'
  }
}
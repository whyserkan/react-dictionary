import 'whatwg-fetch'
import _ from 'lodash'

const wordsUrl = "https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json"

export const getMeaning = () => {
  return fetch(wordsUrl).then(onSuccess, onError);
}

const onSuccess = (response) => {
  return response.json();
}

const onError = (err) => {
  console.log(err);
}
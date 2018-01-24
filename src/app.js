import React from 'react'
import Bootsrap from 'bootstrap/dist/css/bootstrap.min.css';
import { getMeaning, listAutocomplete } from './api/wordsApi'

const Search = (props) => {
  let recommendedList = props.recommendedMeanings.map((text, index) => {
    return (
        <div key={index}>
          <button onClick={() => props.setToSearchText(text)}>{text}</button>
        </div>
    )
  })

  return (
    <div>
      <input onChange={(e) => props.seachTextOnChange(e.target.value)} type="text" placeholder="Search..."/>
      <div>{recommendedList}</div>
      <button onClick={() => props.find(props.searchText)}>Translate</button>
    </div>
  )
}

const ResultPane = (props) => {
  return (
    <div>{props.meaning}</div>
  )
}

class App extends React.Component {

  seachTextOnChange = (text) => {
    if(text.length < 3) {
      return '';
    }

    getMeaning().then((result) => {
      this.setState(() => ({
        recommendedMeanings :
        _.take(
          _.filter(Object.keys(result), (o)=>{
            return o === text.toUpperCase() | o.startsWith(text.toUpperCase() + " ") | o.startsWith(text.toUpperCase())
          })
        ,10)
      }))
    })

    this.setState(() => ({
      searchText: text
    }))
  }

  find = (word) => {
    getMeaning().then(fetchResult => {
      this.setState(() => ({
        result: fetchResult[word.toUpperCase()] ? fetchResult[word.toUpperCase()] : 'Result not found:('
      }))
    })
  }

  setToSearchText = (selectedRecomendation) => {
    this.setState(() => ({
      searchText : selectedRecomendation
    }))
  }

  state = {
    searchText: '',
    result: '',
    recommendedMeanings: []
  }

  render() {
    return (
    <div>
      <Search find={this.find}
              setToSearchText={this.setToSearchText}
              searchText={this.state.searchText}
              seachTextOnChange={this.seachTextOnChange}
              recommendedMeanings={this.state.recommendedMeanings}/>
      <ResultPane meaning={this.state.result} />
    </div>)
  }
}

export default App;
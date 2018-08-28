import React, { Component } from 'react'

import Transformer from 'react-transform-words'

export default class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedOptions: [],
      caseSensitive: false,
      customText: '',
    }

    this.txtCustom = React.createRef()
  }

  handleOptionClick = (option) => {
    var opt = this.state.selectedOptions
    var newOptions = opt.includes(option) ? opt.filter(o => o !== option) : [...opt, option]

    this.setState(
      {
        selectedOptions: newOptions
      }
    )
  }

  handleCaseSensitive = (options) => {
    this.setState({ caseSensitive: !this.state.caseSensitive })
  }

  handleChangeCustomText = () => {
    this.setState({
      customText: this.txtCustom.current.value
    })
  }


  render () {
    const clickDayman = () => {
      console.log("-- CLICKED DAYMAN!! --")
      window.open("http://itsalwayssunny.wikia.com/wiki/The_Dayman", "_blank")
    }
    const optionDetails = {
      "dayman": {
        word: "dayman",
        className: "clicky-word",
        action: 'click',
        caseSensitive: this.state.caseSensitive,
        actionCallback: clickDayman
      },
      "nightman": {
        word: "Nightman",
        className: "highlight-word",
        caseSensitive: this.state.caseSensitive,
      },
      "friendship": {
        word: "friendship",
        className: "change-word",
        action: 'change',
        caseSensitive: this.state.caseSensitive,
        replaceText: 'harmony'
      },
      "custom": {
        word: this.state.customText,
        className: "custom-search-style"
      }
    }
  
    let words = this.state.selectedOptions.map(o => {
      return optionDetails[o]
    })

    if (this.state.customText.length > 0) {
      words = [...words, optionDetails['custom']]
    }
    
    return (
      <div>
        <div className="title-bar">
          React Transform Words
          <a href="https://github.com/codyparker/react-transform-words" className="fontawesome-github" />
        </div>
        <div className="options-panel">
          <div>
            <button
              className={this.state.selectedOptions.includes('dayman') ? 'active' : '' }
              onClick={() => this.handleOptionClick('dayman')}>
              dayman <br /> <small>(clickable)</small>
            </button>
            <span>
              Finds the lower-case word 'dayman', and makes it clickable
            </span>
          </div>
          <div>
            <button
              className={this.state.selectedOptions.includes('nightman') ? 'active' : '' }
              onClick={() => this.handleOptionClick('nightman')}>
              Nightman <br /> <small>(highlight)</small>
            </button>
            <span>
              Finds the capitalized word 'Nightman', and changes its class
            </span>
            </div>
          <div>
            <button
              className={this.state.selectedOptions.includes('friendship') ? 'active' : '' }
              onClick={() => this.handleOptionClick('friendship')}>
              friendship <br /> <small>(replace)</small>
            </button>
            <span>
              Finds the lower-case word 'friendship', and replaces it with another word
            </span>
          </div>
          <div>
            <button
              className={this.state.caseSensitive ? 'active' : ''}
              onClick={() => this.handleCaseSensitive()}>
              Case Sensitive
            </button>
            <span>
              Toggle case sensitivity
            </span>
          </div>
          <hr />
          <div className="center custom-text-entry">
            <div className="custom-instructions">
              Type below to do a "live" search of the text. Matching text will change color and font.
            </div>
            <div>
              <input
                type="text"
                className="custom-text"
                placeholder="type something..."
                onChange={this.handleChangeCustomText}
                ref={this.txtCustom}/>
            </div>
          </div>
        </div>
        <div className="transform-text">
          <Transformer
            words={words}
            displayText='Dayman, fighter of the Nightman, champion of the sun, you’re a master of karate and friendship for everyone. Dayman!' />
        </div>
      </div>
    )
  }
}

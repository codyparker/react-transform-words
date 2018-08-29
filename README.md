# react-transform-words

[![NPM](https://img.shields.io/npm/v/react-transform-words.svg)](https://www.npmjs.com/package/react-transform-words) ![LICENSE](https://img.shields.io/github/license/mashape/apistatus.svg)


> A React component that transforms individual words in a block of text with css classes and actions.


## Install

```bash
yarn add react-transform-words

or

npm install --save react-transform-words
```

## Usage

### [Check out the demo](https://codyparker.github.io/react-transform-words/) for some simple examples. 

```jsx
import React, { Component } from 'react'

import Transformer from 'react-transform-words'

class ExampleTransformer extends Component {
  matchWords = [
    {
      word: 'fat',
      caseSensitive: true,
    },
    {
      word: 'cultivating mass', // can be a phrase
      action: 'click',
      className: 'clicky-word', // set a custom css class
      actionCallback: () => { console.log('clicked!!') } // captures action (on click)
    }
  ]
  render () {
    return (
       <Transformer
        matchWords={this.matchWords}
        displayText={"I’m not fat. I’m cultivating mass. -Fat Mac"} />
    )
  }
}
```
The above would result in this:

![Example Render](/example/public/example.png)

So, we're passing in an array with one word and one phrase to transform. 
* We didn't provide a `className` for *fat*, so it used the built-in default.
* Notice that "fat" isn't matching both occurances because we've passed in `caseSensitive: true` for that word.

## Props

| Property     | Type           | Required | Default            | Description                                                                    |
| :----------- | :------------- | :------: | :----------------- | :----------------------------------------------------------------------------- |
| matchWords   | Array\<Object> | No       |                    | Array of word objects that the transformer will match (see below)              |
| displayText  | String         | Yes      |                    | The text to match words within                                                 |
| defaultClass | String         | No       | built-in highlight | The class applied to matched words that don't have a class provided themselves |

## Search Word Objects

An array of word objects are passed to the Transfomer are used by the component to search for and apply class changes. Each word can have its own options, allowing you to customize each with CSS, actions and more. These are the word object options:

| Option         | Type     | Options                                       | Default            | Description                                                                       |
| :------------- | :------- | :-------------------------------------------: | :----------------- | :-------------------------------------------------------------------------------- |
| word           | String   |                                               |                    | The word to match and transform                                                   |
| className      | String   |                                               | props.defaultClass | Applies the className to the word                                                 |
| action         | String   | 'click', 'doubleclick', 'mouseover', 'change' |                    | Adds the action to the word (use with actionCallback or replaceText)              |
| actionCallback | Function |                                               |                    | The function to be called when the user triggers the action (ie, clicks the word) |
| replaceText    | String   |                                               |                    | The text to replace the word with if using the 'change' action                    |


### Word Object Examples
```js
[
  {
    word: "search for me" // at a minimum, can accept just a word/phrase and the defaultClassName will be used
  },
  {
    word: "search for me", // word to search for, can be a phrase or a single word
    className: "my-custom-class", // class to apply to the word
    action: "doubleclick", // adds onDoubleClick to the word
    actionCallback: handleDoubleClicked, // function will be called when double-clicked
  },
  {
    word: "me too", // word to search for, can be a phrase or a single word
    className: "my-custom-class", // class to apply to the word
    action: "change", // changes the word to replaceText property
    replaceText: "new text" // text that will be used with action 'change'
  }
]
```

## License

MIT © [codyparker](https://github.com/codyparker) | [codyparker.com](http://codyparker.com)

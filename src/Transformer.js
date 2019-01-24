import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Transformer.css'

export const buildMatches = (words, text) => {
  const allMatches = []
  // for each word to transform, find all instances in the provided displayText
  words.filter(hw => hw !== '').forEach((w) => {
    // if there was no start and end provided, search for th word instead
    if (w.start === undefined && w.end === undefined) {
      let searchWord = w.word
      const modifiers = w.caseSensitive ? 'g' : 'gi'
      // if sent in as string(default), escape for regex
      if (w.format !== 'regex') {
        searchWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      }
      try {
        const regex = new RegExp(searchWord, modifiers)
        let match = []
        // eslint-disable-next-line no-cond-assign
        while (match = regex.exec(text)) {
          if (match.index === regex.lastIndex) {
            regex.lastIndex++
          }
          const matchObj = {
            start: match.index,
            end: regex.lastIndex,
          }
          allMatches.push(Object.assign({}, w, matchObj))
        }
      } catch (err) {
        return
      }
    } else {
      allMatches.push(w)
    }
  })
  return allMatches
}

export class Transformer extends Component {
  buildElement = (text, key, match = null) => {
    let elm = <span key={`nomatch-${key}`}>{text}</span>
    if (match) {
      if (match.action === 'click' && !match.actionCallback) {
        match.actionCallback = null
      }
      elm = (
        <span
          key={`match${key}`}
          className={match.className !== undefined ? match.className : this.props.defaultClass}
          onClick={match.action === 'click' ? match.actionCallback : null}
          onDoubleClick={match.action === 'doubleclick' ? match.actionCallback : null}
          onMouseOver={match.action === 'mouseover' ? match.actionCallback : null}
          {...match.extraProps}>
          {match.action === 'change' ? match.replaceText : text}
        </span>
      )
    }
    return elm
  }

  renderWordTransforms = () => {
    const txt = this.props.displayText
    const matchList = buildMatches(this.props.matchWords, txt)
    let prevEnd = 0

    let elements = matchList.sort((m1, m2) => m1.start - m2.start).map((m, idx) => {

      // record previous end spot
      const workingEnd = prevEnd
      // if this part of the text has already been handled
      if (m.start < prevEnd) {
        return null
      }

      prevEnd = m.end
      // if the start of the found word is the next index
      if (workingEnd === m.start) {
        return (
          this.buildElement(txt.substring(workingEnd, m.end), idx, m)
        )
      }

      // current bit of text isn't transformed,
      // so wrap a span around text up to the current transform word
      // from workingEnd to m.start
      const nomatch = this.buildElement(txt.substring(workingEnd, m.start), idx)
      const transformed = this.buildElement(txt.substring(m.start, m.end), idx, m)

      return [
        nomatch,
        transformed,
      ]
    })
    // check to see if prevEnd is the end of the total length
    if (prevEnd < txt.length) {
      elements = [...elements, txt.substring(prevEnd, txt.length)]
    }

    return elements
  }

  render() {
    return (
      <React.Fragment>
        {this.props.matchWords.length > 0 ? this.renderWordTransforms() : this.props.displayText}
      </React.Fragment>
    )
  }
}

Transformer.propTypes = {
  matchWords: PropTypes.array,
  displayText: PropTypes.string.isRequired,
  defaultClass: PropTypes.string,
}

Transformer.defaultProps = {
  defaultClass: styles.highlighter ? styles.highlighter : 'transformer',
  matchWords: [],
}

export default Transformer

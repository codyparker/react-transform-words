import { shallow, mount } from 'enzyme'
import PropTypes from 'prop-types'
import React from 'react'
import Transformer from './'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({ adapter: new Adapter() })


describe('Transformer', () => {

  const testFn = jest.fn()
  const displayText = 'This is test text for a regular search, a manual transform, replace, and a clickable option.'
  const testWords = {
    basic_with_class: [ {word: 'clickable', className: 'yellow-text'} ],
    basic_no_class: [ {word: 'clickable'} ],
    first_word: [ {word: 'This'} ],
    clickable_no_action: [ {word: 'clickable', action: 'click'} ],
    clickable_with_action: [ {word: 'clickable', action: 'click', actionCallback: testFn }],

  }


  it('is truthy', () => {
    expect(Transformer).toBeTruthy()
  })


 it('renders correctly (basic)', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={testWords.basic_with_class} />
    )
    expect(wrapper).toMatchSnapshot()
    
  })


  it('shows the entire text if  `words` is not provided', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={[]} />
    )
    expect(wrapper.find('#word-transformer').exists()).toBe(true)
    expect(wrapper.find('#word-transformer').text()).toBe(wrapper.instance().props.displayText)

  })
  
  it('should have a default highlight class if none provided', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={testWords.basic_no_class} />
    )
    console.log(wrapper.debug())
    console.log(wrapper.first().childAt(1).props('className'))
    expect(wrapper.first().childAt(1).hasClass('Transformer-highlighter')).toBe(true)
  })

  it('should render the found word with the custom class provided', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={testWords.basic_with_class} />
    )
    expect(wrapper.first().childAt(1).hasClass('yellow-text')).toBe(true)
  })

  it('should create three children if a single word is found somewhere in the middle: two spans and some text', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={testWords.basic_no_class} />
    )
    expect(wrapper.first().children()).toHaveLength(3)
  })

   it('should create two children if a single word is found as the first word: two spans', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={testWords.first_word} />
    )
    expect(wrapper.first().children()).toHaveLength(2)
  })

 it('should return with a clickable link if word action = click', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={testWords.clickable_with_action} />
    )
    wrapper.first().childAt(1).simulate('click')
    expect(testFn).toHaveBeenCalled()
  })

  it('should be provided an actionCallback prop if click action is provided', () => {
    const wrapper = shallow(
      <Transformer
        displayText={displayText}
        words={testWords.clickable_no_action} />
    )

  })


  // should handle actions: change, doubleclick, click, mouseover
  // basic should take in simple array and apply default hightlight
  // should handle case sensitivity
  // should handle advanced word list with properties
  
})

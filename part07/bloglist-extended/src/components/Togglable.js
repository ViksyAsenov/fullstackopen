import { React, useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from './styles/Button.styled'
import { TogglableContainer } from './styles/Togglable.styled'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <TogglableContainer>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} id="toggleContainer">
        <Button onClick={toggleVisibility} id="cancelButton">
          Cancel
        </Button>
        <div id="props">{props.children}</div>
      </div>
    </TogglableContainer>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable

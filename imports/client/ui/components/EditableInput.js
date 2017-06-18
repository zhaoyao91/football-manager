import React from 'react'
import { Form, FormGroup, Label, Col, Input, Button, InputGroup, InputGroupAddon }from 'reactstrap'
import { defaultProps, withProps, compose, withState, withHandlers, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

import withStyles from '../../hocs/with_styles'

export default compose(
  setPropTypes({
    value: PropTypes.any,
    updateValue: PropTypes.func, // func(value, done(newValue))，

    beforeGroupAddon: PropTypes.node,
    afterGroupAddon: PropTypes.node,

    buttonsPosition: PropTypes.oneOf(['right', 'bottom']),

    children: PropTypes.node,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    step: PropTypes.string,
    rows: PropTypes.string,
  }),
  defaultProps({
    buttonsPosition: 'right',
  }),
  withState('tempValue', 'setTempValue', ({value}) => value),
  withProps(({value, tempValue}) => ({dirty: tempValue !== value})),
  withState('updating', 'setUpdating', false),
  withHandlers({
    onChange: ({setTempValue}) => (e) => setTempValue(e.target.value),
    onSubmit: ({setUpdating, updateValue, tempValue, setTempValue}) => (e) => {
      e.preventDefault()
      setUpdating(true)
      updateValue(tempValue, (newValue) => {
        setUpdating(false)
        setTempValue(newValue)
      })
    },
    reset: ({value, setTempValue}) => () => setTempValue(value)
  }),
  withStyles('styles', {
    rightInputBlock: {
      display: 'flex'
    },
    rightButtonsBlock: {
      flexShrink: 0,
    },
    bottomInputBlock: {},
    bottomButtonsBlock: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }),
  withProps(({styles, buttonsPosition}) => ({
    inputBlockStyle: do {
      if (buttonsPosition === 'right') {styles.rightInputBlock}
      else if (buttonsPosition === 'bottom') {styles.bottomInputBlock}
    },
    buttonsBlockStyle: do {
      if (buttonsPosition === 'right') {styles.rightButtonsBlock}
      else if (buttonsPosition === 'bottom') {styles.bottomButtonsBlock}
    }
  }))
)(function EditableInput ({inputBlockStyle, buttonsBlockStyle, rows, beforeGroupAddon, afterGroupAddon, step, children, updating, dirty, styles, reset, label, type, placeholder, tempValue, onChange, onSubmit}) {
  function renderInput () {
    return <Input step={step} disabled={updating} type={type} placeholder={placeholder} value={tempValue}
                  rows={rows} onChange={onChange}>
      {children}
    </Input>
  }

  return <Form onSubmit={onSubmit}>
    <FormGroup row>
      <Label sm="3">{label}</Label>
      <Col sm="9" {...inputBlockStyle}>
        {
          (!beforeGroupAddon && !afterGroupAddon) && renderInput()
        }
        {
          (beforeGroupAddon || afterGroupAddon) && <InputGroup>
            {beforeGroupAddon && <InputGroupAddon>{beforeGroupAddon}</InputGroupAddon>}
            {renderInput()}
            {afterGroupAddon && <InputGroupAddon>{afterGroupAddon}</InputGroupAddon>}
          </InputGroup>
        }
        {
          dirty && <div {...buttonsBlockStyle}>
            <Button disabled={updating} outline color="primary" type="submit">保存</Button>
            <Button disabled={updating} outline color="danger" type="button" onClick={reset}>取消</Button>
          </div>
        }
      </Col>
    </FormGroup>
  </Form>
})
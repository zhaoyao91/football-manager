import React from 'react'
import { Form, FormGroup, Label, Col, Input, Button, InputGroup, InputGroupAddon }from 'reactstrap'
import { withProps, compose, withState, withHandlers, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

import withStyles from '../../hocs/with_styles'

export default compose(
  setPropTypes({
    value: PropTypes.any,
    updateValue: PropTypes.func, // func(value, done(newValue))，

    beforeGroupAddon: PropTypes.node,
    afterGroupAddon: PropTypes.node,

    children: PropTypes.node,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    step: PropTypes.string,
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
    inputWrapper: {
      display: 'flex'
    },
    buttonsWrapper: {
      flexShrink: 0,
    }
  }),
)(function EditableInput ({beforeGroupAddon, afterGroupAddon, step, children, updating, dirty, styles, reset, label, type, placeholder, tempValue, onChange, onSubmit}) {
  function renderInput () {
    return <Input step={step} disabled={updating} type={type} placeholder={placeholder} value={tempValue}
                  onChange={onChange}>
      {children}
    </Input>
  }

  return <Form onSubmit={onSubmit}>
    <FormGroup row>
      <Label sm="2">{label}</Label>
      <Col sm="10" {...styles.inputWrapper}>
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
          dirty && <div {...styles.buttonsWrapper}>
            <Button disabled={updating} outline color="primary" type="submit">保存</Button>
            <Button disabled={updating} outline color="danger" type="button" onClick={reset}>取消</Button>
          </div>
        }
      </Col>
    </FormGroup>
  </Form>
})
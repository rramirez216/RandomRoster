import React from 'react'
import styled from 'styled-components'

const Checkbox = ({ handleRadio, value }) => {
  return (
    <Label htmlFor='radio'>
      {value}
      <input
        type='radio'
        id='radio'
        name='radio'
        onChange={() => {
          handleRadio(value)
        }}
      />
    </Label>
  )
}

const Label = styled.label``

export default Checkbox

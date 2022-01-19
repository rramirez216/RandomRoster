import React from 'react'
import styled from 'styled-components'

const Checkbox = ({ handleRadio, value }) => {
  return (
    <label htmlFor='radio'>
      {value}
      <input
        type='radio'
        id='radio'
        name='radio'
        onChange={() => {
          handleRadio(value)
        }}
      />
    </label>
  )
}

export default Checkbox

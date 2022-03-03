import React from 'react'
import styled from 'styled-components'

const Checkbox = ({ handleRadio, value, selected }) => {
  return (
    <Label htmlFor='radio'>
      {value}
      <Input
        type='radio'
        id='radio'
        name='radio'
        value={value}
        checked={selected === value}
        onChange={(event) => {
          handleRadio(event.target.value)
        }}
      />
      <Checkmark></Checkmark>
    </Label>
  )
}

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`
const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  &::after {
    content: '';
    position: absolute;
    display: none;
  }
`
const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1.2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover ${Input} ~ ${Checkmark} {
    background-color: #ccc;
  }
  & ${Input}:checked ~ ${Checkmark} {
    background-color: hsl(131, 27%, 49%);
  }
  & ${Input}:checked ~ ${Checkmark}::after {
    display: block;
  }
  & ${Checkmark}::after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`

export default Checkbox

import React from 'react'
const Button = (props) =>  {
  return (
    <button onClick={props.onClick}>
          {props.text || 'Button'}
    </button>
  )
}

export default Button

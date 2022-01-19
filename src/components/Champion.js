import React from 'react'
import styled from 'styled-components'

const Champion = ({ champion: { id, name, title } }) => {
  return (
    <div>
      <div>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
          alt=''
        />
      </div>
      <p>{name}</p>
      <p>{title}</p>
    </div>
  )
}

export default Champion

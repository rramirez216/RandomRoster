import React from 'react'
import styled from 'styled-components'

const Champion = ({
  champion: { id, name, title },
  skinNumber,
  handleSkinChange,
}) => {
  return (
    <>
      <div>
        <Image
          src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skinNumber}.jpg`}
          alt='splash art'
          onClick={handleSkinChange}
        />
      </div>
      <Name>{name}</Name>
      <Title>{title}</Title>
    </>
  )
}

const Image = styled.img`
  border-radius: 16px;
  cursor: pointer;
`

const Name = styled.p`
  font-size: 3rem;
  margin: 32px 0 16px 0;
`
const Title = styled.p`
  font-size: 1.5rem;
`

export default Champion

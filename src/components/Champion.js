import React from 'react'
import '../index.css'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Champion = ({
  champion: { id, name, title },
  skinNumber,
  handleSkinChange,
  showContent,
  variants,
  allowOpacityAnimation,
}) => {
  let animation = ''
  if (allowOpacityAnimation > 0) {
    animation = showContent ? 'disappear' : 'reappear'
  }
  return (
    <Wrapper className='shadow' variants={variants} animate={'spin'}>
      <InnerWrapper variants={variants} animate={animation}>
        <div>
          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skinNumber}.jpg`}
            alt='splash art'
            onClick={handleSkinChange}
          />
        </div>
        <Name>{name}</Name>
        <Title>{title}</Title>
      </InnerWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  max-width: 450px;
  text-align: center;
  padding: 64px 32px;
  border-radius: 16px;
  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`
const InnerWrapper = styled(motion.div)``
const Image = styled.img`
  border-radius: 16px;
  cursor: pointer;
`

const Name = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 32px 0 16px 0;
`
const Title = styled.p`
  color: hsl(201, 23%, 34%);
  font-size: 1.5rem;
`

export default Champion

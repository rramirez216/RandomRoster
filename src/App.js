import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components/macro'
import GlobalStyles from './GlobalStyles'

import Radio from './components/Radio'
import Champion from './components/Champion'

function App() {
  const [champions, setChampions] = useState(null)
  const [randomChampion, setRandomChampion] = useState(null)
  const [filteredList, setFilteredList] = useState(null)

  const tagsArray = [
    'All',
    'Mage',
    'Assassin',
    'Tank',
    'Fighter',
    'Support',
    'Marksman',
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios(
          'http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json'
        )
        setChampions(Object.values(response.data.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleRandomChampion = () => {
    if (champions && filteredList) {
      let randomNum = Math.floor(Math.random() * filteredList.length - 1)
      setRandomChampion(filteredList[randomNum])
      return console.log(filteredList[randomNum].id)
    } else if (champions) {
      let randomNum = Math.floor(Math.random() * champions.length - 1)
      setRandomChampion(champions[randomNum])
      return console.log(champions[randomNum])
    }
  }

  const handleRadio = (tag) => {
    if (tag === 'All') {
      setFilteredList(null)
    } else {
      let filteredChampions = champions.filter((value) =>
        value.tags.includes(tag)
      )
      setFilteredList(filteredChampions)
    }
  }

  return (
    <OuterWrapper>
      <Wrapper>
        {champions && randomChampion && <Champion champion={randomChampion} />}
      </Wrapper>
      <Button onClick={() => handleRandomChampion()}>random champion</Button>
      <InputWrapper>
        {tagsArray.map((value, index) => (
          <Radio key={index} value={value} handleRadio={handleRadio} />
        ))}
      </InputWrapper>
      <GlobalStyles />
    </OuterWrapper>
  )
}

const OuterWrapper = styled.main`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 32px;
`
const Wrapper = styled.div`
  color: green;
  font-size: 3rem;
`
const Button = styled.button`
  max-width: 200px;
  background-color: white;
  border-color: #9cd8a7;
  padding: 8px 16px;
  border-radius: 4px;
`
const InputWrapper = styled.div`
  display: flex;
  gap: 16px;
`

export default App

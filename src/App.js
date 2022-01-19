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
    <div>
      <Wrapper>
        {champions && randomChampion && <Champion champion={randomChampion} />}
      </Wrapper>
      <button onClick={() => handleRandomChampion()}>random champion</button>
      <div>
        {tagsArray.map((value, index) => (
          <Radio key={index} value={value} handleRadio={handleRadio} />
        ))}
      </div>
      <GlobalStyles />
    </div>
  )
}
const Wrapper = styled.div`
  color: green;
  font-size: 3rem;
`
export default App

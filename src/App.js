import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

import GlobalStyles from './GlobalStyles'
import Radio from './components/Radio'
import Champion from './components/Champion'

function App() {
  const [champions, setChampions] = useState(null)
  const [randomChampion, setRandomChampion] = useState(null)
  const [filteredList, setFilteredList] = useState(null)
  const [championId, setChampionId] = useState('')

  const [skinList, setSkinList] = useState(null)
  const [currentSkin, setCurrentSkin] = useState(0)
  const [skinListIndex, setSkinListIndex] = useState(0)

  const [selected, setSelected] = useState('All')

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios(
          `http://ddragon.leagueoflegends.com/cdn/12.4.1/data/en_US/champion/${championId}.json`
        )
        setSkinList(response.data.data[championId].skins)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [championId])

  const handleRandomChampion = () => {
    if (champions && filteredList) {
      let randomNum = Math.floor(Math.random() * filteredList.length)
      setRandomChampion(filteredList[randomNum])
      setChampionId(filteredList[randomNum].id)
      // return console.log(
      //   filteredList[randomNum].id,
      //   randomNum,
      //   filteredList.length
      // )
    } else if (champions) {
      let randomNum = Math.floor(Math.random() * champions.length)
      setRandomChampion(champions[randomNum])
      setChampionId(champions[randomNum].id)
      // return console.log(champions[randomNum], randomNum, champions.length)
    }
  }

  const handleSkinChange = () => {
    if (skinList[skinList.length - 1].num === currentSkin) {
      setCurrentSkin(0)
      setSkinListIndex(0)
    } else {
      setCurrentSkin(skinList[skinListIndex + 1].num)
      setSkinListIndex(skinListIndex + 1)
      console.log(currentSkin)
    }
  }

  const handleRadio = (tag) => {
    if (tag === 'All') {
      setFilteredList(null)
      setSelected(tag)
    } else {
      let filteredChampions = champions.filter((value) =>
        value.tags.includes(tag)
      )
      setFilteredList(filteredChampions)
      setSelected(tag)
    }
  }

  return (
    <OuterWrapper>
      <HeadingOne>Random Champion Generator</HeadingOne>
      <Wrapper className='shadow'>
        {champions && randomChampion && (
          <Champion
            champion={randomChampion}
            skinNumber={currentSkin}
            handleSkinChange={handleSkinChange}
          />
        )}
      </Wrapper>
      <Button
        whileHover={{
          scale: 1.1,
          transition: {
            type: 'spring',
            duration: 0.8,
            bounce: 0.8,
          },
        }}
        whileTap={{
          scale: 0.9,
          transition: {
            type: 'spring',
            duration: 0.8,
            bounce: 0.8,
          },
        }}
        onClick={() => {
          handleRandomChampion()
          setCurrentSkin(0)
          setSkinListIndex(0)
        }}
        className='shadow-low'
      >
        random champion
      </Button>
      <InputWrapper>
        {tagsArray.map((value, index) => (
          <Radio
            key={index}
            value={value}
            handleRadio={handleRadio}
            selected={selected}
          />
        ))}
      </InputWrapper>
      <GlobalStyles />
    </OuterWrapper>
  )
}

const OuterWrapper = styled.main`
  height: 100%;
  padding: 96px 32px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 48px;
  overflow: scroll;
`
const HeadingOne = styled.h1`
  font-size: 2.5rem;
`
const Wrapper = styled.div`
  max-width: 450px;

  font-size: 3rem;
  text-align: center;
  padding: 64px 32px;
  border-radius: 16px;
`
const Button = styled(motion.button)`
  font-family: 'PT Sans';
  font-size: 1.1rem;
  max-width: 200px;
  color: white;
  background-color: hsl(131, 27%, 49%);
  /* border-style: none; */
  border: 2px solid black;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`
const InputWrapper = styled.div`
  display: flex;
  gap: 16px;
`

export default App

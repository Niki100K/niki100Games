import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActiveStatus } from '../ActiveStatus'
import { FaHeadset } from "react-icons/fa";
import { RxCountdownTimer } from "react-icons/rx";
import { FaBasketShopping } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import axios from 'axios'

import multiPlayer from '../assets/multiPlayer.png'
import Simulation from '../assets/Simulation.png'
import Adventure from '../assets/Adventure.png'
import Strategy from '../assets/strategy.png'
import Survival from '../assets/Survival.png'
import Fighting from '../assets/Fighting.png'
import Hunting from '../assets/Hunting.png'
import Action from '../assets/Action.png'
import Puzzle from '../assets/Puzzle.png'
import Sports from '../assets/Sports.png'
import BattleRoyale from '../assets/Battle Royale.png'
import RolePlaying from '../assets/Role-Playing.png'
import FirstPerson from '../assets/First-Person.png'
import OpenWorld from '../assets/Open World.png'

import threads from '../assets/threads.png'
import twitter from '../assets/twitter.png'
import instagram from '../assets/instagram.png'
import facebook from '../assets/facebook.png'
import telegram from '../assets/telegram.png'


const AboutGame = () => {

    
    const gameRef = useRef()
    const recommendGameRef = useRef()
    const {gameName} = useParams()
    const {
        gamesData,
        userData, API, fetchUserData
    } = useContext(ActiveStatus)
    const [gameData, setGameData] = useState({})
    const [correctIconCategory, setCorrectIconCategory] = useState(multiPlayer)
    useEffect(() => {
        const name = gameName
        let game = gamesData.find(game => game.name === name)
        setGameData(game || '')
        switch (game?.category) {
            case 'Multiplayer':
                setCorrectIconCategory(multiPlayer)
                break;
            case 'Simulation':
                setCorrectIconCategory(Simulation)
                break;
            case 'Adventure':
                setCorrectIconCategory(Adventure)
                break;
            case 'Strategy':
                setCorrectIconCategory(Strategy)
                break;
            case 'Survival':
                setCorrectIconCategory(Survival)
                break;
            case 'Fighting':
                setCorrectIconCategory(Fighting)
                break;
            case 'Hunting':
                setCorrectIconCategory(Hunting)
                break;
            case 'Action':
                setCorrectIconCategory(Action)
                break;
            case 'Puzzle':
                setCorrectIconCategory(Puzzle)
                break;
            case 'Sports':
                setCorrectIconCategory(Sports)
                break;
            case 'Battle Royale':
                setCorrectIconCategory(BattleRoyale)
                break;
            case 'Role-Playing':
                setCorrectIconCategory(RolePlaying)
                break;
            case 'First-Person':
                setCorrectIconCategory(FirstPerson)
                break;
            case 'Open World':
                setCorrectIconCategory(OpenWorld)
                break;
            default:
                break;
        }
    }, [gamesData, gameName])
    const [gameImgSize, setGameImgSize] = useState(0)
    const [recommendedGameImgSize, setRecommendedGGameImgSize] = useState(0)
    const handleResize = useCallback(() => {
        const width1 = gameRef.current.clientWidth
        const width2 = recommendGameRef.current.clientWidth
        setGameImgSize(width1 / 5)
        setRecommendedGGameImgSize(width2 / 4.2)
        if (window.innerWidth < 480) {
        setGameImgSize(width1 / 3)
        }
        if (window.innerWidth < 420) {
        setRecommendedGGameImgSize(width2 / 3)
        }
        if (window.innerWidth < 320) {
            setRecommendedGGameImgSize(width2 / 2)
            }
    }, [])
    useEffect(() => {
        handleResize()
    }, [handleResize])
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [handleResize])
    useEffect(() => {
        console.log(gameData);
    }, [gameData])

    const socials = [
        {
          img: threads,
          link: 'https://www.threads.net',
        },
        {
          img: twitter,
          link: 'https://twitter.com',
        },
        {
          img: instagram,
          link: 'https://www.instagram.com',
        },
        {
          img: facebook,
          link: 'https://www.facebook.com',
        },
        {
          img: telegram,
          link: 'https://web.telegram.org',
        },
    ]

    const icons = [
        {
            icon: RxCountdownTimer,
            p: 'right to return'
        },
        {
            icon: FaHeadset,
            p: '24/7 service'
        },
        {
            icon: FaBasketShopping,
            p: 'our stores'
        },
        {
            icon: IoShieldCheckmarkOutline,
            p: 'price protection'
        },
    ]

    const [loadingData, setLoadingData] = useState(false)

    const handleAddGame = async () => {
        setLoadingData(true)
        try {
             await axios.post(`${API}/addGame`, {
                userId: userData.id,
                game: gameData,
            })
            fetchUserData(userData.id)
            setLoadingData(false)
        } catch (error) {
            console.error(error);
        }
    }
    const handleRemoveGame = async () => {
        setLoadingData(true)
        try {
            const response = await axios.delete(`${API}/removeGameId`, {
                data: {
                    userId: userData.id,
                    id: gameData.id,
                }
            })
            if (response.status === 200) {
                fetchUserData(userData.id)
                setLoadingData(false)
            }
        } catch (error) {
            console.error(error);
        }
    }

  return {
    gameRef,
    gameImgSize,
    correctIconCategory,
    handleAddGame,
    loadingData,
    handleRemoveGame,
    recommendGameRef,
    gameData,
    recommendedGameImgSize,
    socials,
    icons,
  }
}

export default AboutGame

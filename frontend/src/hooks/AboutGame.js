import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActiveStatus } from '../ActiveStatus'
import axios from 'axios'

const AboutGame = () => {
    const conWidth = useRef()
    const moreGames = useRef()
    const { gameName } = useParams()
    const name = gameName

    const { gamesData, userData, API, fetchUserData } = useContext(ActiveStatus)
    const [gameWidth, setGameWidth] = useState(0)
    const [moreGamesWidth, setMoreGamesWidth] = useState(0)

    const handleUpdateWidth = useCallback(() => {
        let width = conWidth.current.clientWidth
        let widthMoreGames = moreGames.current.clientWidth
        setMoreGamesWidth(widthMoreGames / 5.2)
        if (window.innerWidth > 880) {
        setGameWidth(width / 5.2)
        }
        if (window.innerWidth <= 880) {
        setGameWidth(width / 3.2)
        }
        if (widthMoreGames <= 680) {
        setMoreGamesWidth(widthMoreGames / 3.2)
        }
        if (widthMoreGames <= 380) {
        setMoreGamesWidth(widthMoreGames / 2.1)
        }
    }, [])
    useEffect(() => {
        handleUpdateWidth()
    }, [handleUpdateWidth])

    useEffect(() => {
        window.addEventListener("resize", handleUpdateWidth)
        return () => {
            window.removeEventListener("resize", handleUpdateWidth)
        }
    }, [handleUpdateWidth])
    const [gameData, setGameData] = useState({})
    useEffect(() => {
        const name = gameName
        let game = gamesData.find(game => game.name === name)
        setGameData(game || '')
    }, [gamesData, gameName])

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
            
        }
    }
  return {
    conWidth,
    gameWidth,
    moreGamesWidth,
    gameData,
    handleAddGame,
    handleRemoveGame,
    name,
    moreGames,
    loadingData,
  }
  
}

export default AboutGame

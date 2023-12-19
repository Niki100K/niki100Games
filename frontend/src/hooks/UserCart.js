import { useContext, useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActiveStatus } from '../ActiveStatus';
import axios from 'axios';

const UserCart = () => {

  const conWidth = useRef()
  const { cartData, userData, fetchUserData, API } = useContext(ActiveStatus)
  const navigate = useNavigate()
  const [gameWidth, setGameWidth] = useState(0)
  const handleResize = useCallback(() => {
    const width = conWidth.current.clientWidth;
    setGameWidth(width > 580 ? width / 5 : width / 3);
  }, [conWidth]);

  useEffect(() => {
    handleResize()
  }, [handleResize])
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => 
    window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const [quantityGames, setQuantityGames] = useState([])
  useEffect(() => {
    const addQuantity = cartData.map((game) => ({
      ...game,
      quantity: 1
    }))
    setQuantityGames(addQuantity)
  }, [cartData])

  const handleChangeQuantity = (id, e) => {
    let value = e.target.value
    value = value.replace(/\D/g, '')
    value = value.length > 4 ? value.slice(0, 4) : value
    if (value === '' || parseInt(value) === 0) {
      value = 1
    }
    const games = quantityGames.map((game) => {
      if (game.id === id) {
        game.quantity = parseInt(value)
        return game
      }
      return game
    })
    setQuantityGames(games)
  }
  const handleButtonQuantity = (method, id) => {
    const games = quantityGames.map((game) => {
      if (game.id === id) {
        if (method === 'add') {
          game.quantity = game.quantity < 10000 ? game.quantity += 1 : game.quantity
        } else {
          game.quantity = game.quantity > 1 ? game.quantity -= 1 : game.quantity
        }
        return game
      }
      return game
    })
    setQuantityGames(games)
  }

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  useEffect(() => {
    const price = quantityGames.reduce((acc, game) => {
      return acc + game.price * game.quantity
    }, 0)
    const products = quantityGames.reduce((acc, game) => {
      return acc + game.quantity
    }, 0)
    setTotalPrice(price)
    setTotalProducts(products)
  }, [quantityGames])


  const removeGame = async (gameId) => {
    try {
      const response = await axios.delete(`${API}/removeGameId`, {
        data: {
          userId: userData.id,
          id: gameId
        }
      })
      if (response.status === 200) {
        fetchUserData(userData.id)
      }
    } catch (error) {
      console.error(error);
    }
  }
  const removeOrder = async () => {
    try {
      const response = await axios.delete(`${API}/clearCart`, {
        data: {
          id: userData.id
        }
      })
      if (response.status === 200) {
        fetchUserData(userData.id)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const finishOrder = async () => {
    try {
      const response = await axios.post(`${API}/finishOrder`, {
        id: userData.id,
        gamesData: quantityGames,
        totalPrice: totalPrice,
        products: totalProducts,
      })
      if (response.status === 201) {
        fetchUserData(userData.id)
        navigate('/')
      }
    } catch (error) {
      console.error(error);
    }
  }

  
    return {
      conWidth,
      gameWidth,
      quantityGames,
      handleChangeQuantity,
      handleButtonQuantity,
      totalPrice,
      totalProducts,
      removeGame,
      removeOrder,
      finishOrder,
    }
}

export default UserCart

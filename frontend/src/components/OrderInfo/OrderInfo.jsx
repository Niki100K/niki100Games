import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ActiveStatus } from '../../ActiveStatus'
import './OrderInfo.css'
import axios from 'axios'
const OrderInfo = () => {
  const { id } = useParams()
  const orderId = id
  const conWidth = useRef()
  const navigate = useNavigate()
  const {
    orderedGames,
    ordersData,
    API,
    isActive,
    fetchUserData,
    userData,
  } = useContext(ActiveStatus)

  const [correctGames, setCorrectGames] = useState([])
  const [correctOrder, setCorrectOrder] = useState({})
  useEffect(() => {
    const data = orderedGames.filter(order => order.orderId === parseInt(orderId))
    const correctOrder = ordersData.find(order => order.id === parseInt(orderId))
    setCorrectGames(data || '')
    setCorrectOrder(correctOrder || '')
  }, [orderedGames, orderId, ordersData])
  const [gameWidth, setGameWidth] = useState(0)
  const handleResize = useCallback(() => {
    let width = conWidth.current.clientWidth
    if (window.innerWidth > 720) {
    setGameWidth(width / 5)
    }
    if (window.innerWidth <= 720) {
      setGameWidth(width / 3)
    }
    if (window.innerWidth <= 420) {
      setGameWidth(width / 3.5)
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
  
  const deleteOrder = async () => {
    try {
      const response = await axios.delete(`${API}/deleteOrder`, {
        data: {
          correctOrder,
        }
      })
      if (response.status === 200) {
        navigate('/')
        fetchUserData(userData.id)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isActive) {
      navigate('/')
    }
  }, [isActive, navigate])

  return (
    <>
    <div className='background'></div>
    <div className='OrderInfo'>
      <div className='con' ref={conWidth}>
        <div className='games'>
          {correctGames.map((game, index) => (
            <div className='game' key={index}>
              <Link to={`/game/${game.name}`} className='img' style={{width: gameWidth, minWidth: gameWidth, height: gameWidth * 1.5}}>
                <img src={game.image} alt="" />
              </Link>
              <div className='text'>
                <div className='info'>
                  <h2>{game.name}</h2>
                  <p>{game.price}$</p>
                </div>
                <div className='quantity'>
                  <h2>Quantity: <span>{(parseInt(game.quantity).toLocaleString())}</span></h2>
                </div>
                <div className='total'>
                  <h2>Total for product: <span>{parseFloat(game.quantity * game.price).toLocaleString()}$</span></h2>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='sticky'>
          <div className='box'>
            <div className='info'>
              <h2>About Order:</h2>
            </div>
            <div className='manage'>
              <div className='earch'>
                <p>Date:</p>
                <p>{correctOrder.date}</p>
              </div>
              <div className='earch'>
                <p>Total:</p>
                <p>{(parseFloat(correctOrder.total)).toLocaleString()}$</p>
              </div>
              <div className='earch'>
                <p>Products:</p>
                <p>{parseInt(correctOrder.products).toLocaleString()}</p>
              </div>
            </div>
            <button onClick={() => navigate('/')}>go back</button>
            <button onClick={deleteOrder}>delete</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default OrderInfo

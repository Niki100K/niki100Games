import React, { createContext, useState, useEffect, useRef } from 'react'
import axios from 'axios'
export const ActiveStatus = createContext()
export const ActiveProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false)

  const [gamesData, setGamesData] = useState([])
  const [cartData, setCartData] = useState([])
  const [userData, setUserData] = useState({})
  const [ordersData, setOrdersData] = useState([])
  const [orderedGames, setOrderedGames] = useState([])

  const isInitialMount = useRef(true);


  const login = (id) => {
    setIsActive(true)
    fetchUserData(id)
  }
  const logout = () => {
    setIsActive(false)
    setUserData({})
    setCartData([])
    setOrdersData([])
  }

  const API = 'http://localhost:3004'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/games`)
        const data = await response.json()
        setGamesData(data)
      } catch (error) {
        console.error(error);
      }
    }
    if (isInitialMount.current) {
      fetchData()
      isInitialMount.current = false
    }
  }, [])

  const fetchUserData = async (id) => {
    try {
      const [data, cart, orders, ordered] = await Promise.all([
        axios.get(`${API}/data`, { params: { id: id }}),
        axios.get(`${API}/cart`, { params: { id: id }}),
        axios.get(`${API}/orders`, { params: { id: id }}),
        axios.get(`${API}/orderedGames`, { params: { id: id }}),
      ]);
      const onlyData = data.data
      const onlyCart = cart.data
      const onlyOrders = orders.data
      const onlyOrdered = ordered.data
      setUserData(onlyData[0])
      setCartData(onlyCart)
      setOrdersData(onlyOrders)
      setOrderedGames(onlyOrdered)


    } catch (error) {
      console.error(error);
    }
  }

    return(
        <ActiveStatus.Provider value={{
          login,
          logout,
          isActive,
          setCartData,
          setUserData,
          userData,
          gamesData,
          ordersData,
          cartData,
          fetchUserData,
          API,
          orderedGames,
        }}>
            { children }
        </ActiveStatus.Provider>
    )

}

import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';



import { FaRegUser } from "react-icons/fa";
import { BsCart3, BsClock } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";

import { ActiveStatus } from '../ActiveStatus';
const Profile = () => {
  const navigate = useNavigate()

  const { userData, ordersData, cartData, logout, API, fetchUserData } = useContext(ActiveStatus)
  
  const [correctCard, setCorrectCard] = useState(1)

  const handleShowCorrectCard = (number) => {
    setCorrectCard(number)
    if (number === 4) {
      logout()
    }
  }

  useEffect(() => {
    if (cartData.length === 0) {
      setCorrectCard(1)
    }
  }, [cartData])

  const cardsCon = [
    {
      icon: FaRegUser,
      text: 'Account Settings',
      number: 1,
    },
    {
      icon: BsCart3,
      text: 'My Cart',
      number: 3,
      valid: cartData.length,
    },
    {
      icon: BsClock,
      text: 'Ordered Items',
      number: 2,
      valid: ordersData.length,
    },
    {
      icon: SlLogout,
      text: 'Secure Log out',
      number: 4,
    },
  ]

  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    newPassword: '',
    confirmPassword: '',
  })

  const handleChangeData = (field, e, maxSymbols) => {
    let value = e.target.value
    if (field === 'phone') {
      value = value.replace(/\D/g, '')
    }
    value = value.length > maxSymbols ? value.slice(0, maxSymbols) : value

    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const [updateFields, setUpdateFields] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
  })

  const handleChangeUpdateFields = (field) => {
    setUpdateFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const [emptyErrors, setEmptyErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    newPassword: false,
    confirmPassword: false,
  })

  const parts = [
    {
      head: 'Full Name',
      data: [
        userData.firstName,
        userData.lastName,
      ],
      field: 'fullName',
      inputs: [
        {
          field: 'firstName',
          value: formData.firstName,
          label: 'First Name',
          error: emptyErrors.firstName,
          maxSymbols: 12,
          id: 'firstName',
          type: 'firstName',
        },
        {
          field: 'lastName',
          value: formData.lastName,
          label: 'Last Name',
          error: emptyErrors.lastName,
          maxSymbols: 12,
          id: 'lastName',
          type: 'lastName',
        },
      ]
    },
    {
      head: 'Email',
      data: [
        userData.email,
      ],
      field: 'email',
      inputs: [
        {
          field: 'email',
          value: formData.email,
          label: 'Email',
          error: emptyErrors.email,
          maxSymbols: 30,
          id: 'adminEmail',
          type: 'email',
        },
      ]
    },
    {
      head: 'Phone',
      data: [
        userData.phone,
      ],
      field: 'phone',
      inputs: [
        {
          field: 'phone',
          value: formData.phone,
          label: 'Phone',
          error: emptyErrors.phone,
          maxSymbols: 12,
          id: 'tel',
          type: 'tel',
        },
      ]
    },
    {
      head: 'Password',
      data: [
        '******',
      ],
      field: 'password',
      inputs: [
        {
          field: 'password',
          value: formData.password,
          label: 'Old Password',
          error: emptyErrors.password,
          maxSymbols: 50,
          id: 'niki100GamesPassword',
          type: 'password',
        },
        {
          field: 'newPassword',
          value: formData.newPassword,
          label: 'New Password',
          error: emptyErrors.newPassword,
          maxSymbols: 50,
          id: 'niki100GamesNewPassword',
          type: 'password',
        },
        {
          field: 'confirmPassword',
          value: formData.confirmPassword,
          label: 'Confirm Password',
          error: emptyErrors.confirmPassword,
          maxSymbols: 50,
          id: 'niki100GamesConirmPassword',
          type: 'password',
        },
      ]
    },
  ]

  const [orderArrowMange, setOrderArrowMange] = useState({
    date: 0,
    products: 0,
    orderId: 0,
    total: 0,
    search: '',
  })
  
  const handleChangeArrow = (field) => {
    if (orderArrowMange[field] === 0) {
      setOrderArrowMange(prev => ({
        ...prev,
        [field]: 1
      }))
    } else if (orderArrowMange[field] === 1) {
      setOrderArrowMange(prev => ({
        ...prev,
        [field]: 2
      }))
    } else {
      setOrderArrowMange(prev => ({
        ...prev,
        [field]: 0
      }))
    }
  }

  const handleChangeSearch = (e) => {
    let value = e.target.value
    value = value.replace(/\D/g, '')

    setOrderArrowMange((prev => ({
      ...prev,
      search: value.length > 5 ? value.slice(0, 5) : value
    })))
  }

  const [sortedOrders, setsortedOrders] = useState([])

  useEffect(() => {
    const newOrders = ordersData.filter(order => {
      const sameId = orderArrowMange.search.length === 0 || parseInt(orderArrowMange.search, 10) === order.id
      return sameId
    })
    
    if (orderArrowMange.date === 1) {
      newOrders.sort((a,b) => a.date - b.date)
    } else if (orderArrowMange.date === 2) {
      newOrders.sort((a,b) => b.date - a.date)
    }

    if (orderArrowMange.products === 1) {
      newOrders.sort((a,b) => a.products - b.products)
    } else if (orderArrowMange.products === 2) {
      newOrders.sort((a,b) => b.products - a.products)
    }

    if (orderArrowMange.orderId === 1) {
      newOrders.sort((a,b) => a.id - b.id)
    } else if (orderArrowMange.orderId === 2) {
      newOrders.sort((a,b) => b.id - a.id)
    }

    if (orderArrowMange.total === 1) {
      newOrders.sort((a,b) => a.total - b.total)
    } else if (orderArrowMange.total === 2) {
      newOrders.sort((a,b) => b.total - a.total)
    }

    setsortedOrders(newOrders)
  }, [orderArrowMange, ordersData])

  const cardWidth = useRef()
  const [gameWidth, setGameWidth] = useState(0)
  const handleChangeWidth = useCallback(() => {
    let width = cardWidth.current.clientWidth
    if (window.innerWidth > 980) {
      setGameWidth(width / 5.2)
    }
     if (window.innerWidth <= 980) {
      setGameWidth(width / 3.2)
    } 
    if (window.innerWidth <= 680) {
      setGameWidth(width / 2.2)
    }
    if (window.innerWidth <= 420) {
      setGameWidth(width / 3.2)
    }
  }, [])

  useEffect(() => {
    handleChangeWidth()
  }, [handleChangeWidth])

  useEffect(() => {
    window.addEventListener("resize", handleChangeWidth)
    return () => {
      window.removeEventListener("resize", handleChangeWidth)
    }
  }, [handleChangeWidth])

  const [quantityGames, setQuantityGames] = useState([])

  useEffect(() => {
    const newGames = cartData.map((prev) => ({
      ...prev,
      quantity: 1
    }))
    setQuantityGames(newGames)
  }, [cartData])

  const handleChangeQuantity = (id, e) => {
    let value = e.target.value
    value = value.replace(/\D/g, '')
    value = parseInt(value) === 0 ? 1 : value
    let correctNumber = value.length > 4 ? value.slice(0, 4) : value
    
    const updatedQuantityGames = quantityGames.map((game) => {
      if (game.gameId === id) {
        game.quantity = value === '' ? parseInt(1, 10) : parseInt(correctNumber, 10);
      }
      return game;
    });
  
    setQuantityGames(updatedQuantityGames);
  }
  

  const handleButtonChangeQuantity = (id, fun) => {
    const updatedQuantityGames = quantityGames.map((game) => {
      if (game.gameId === id) {
        if (fun === 'add' && game.quantity < 10000) {
          game.quantity += 1;
        } else if (fun === 'remove' && game.quantity > 1) {
          game.quantity -= 1;
        }
      }
      return game;
    });
  
    setQuantityGames(updatedQuantityGames);
  }
  

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const total = quantityGames.reduce((acc, game) => {
      return acc + game.quantity * game.price
    }, 0)
    setTotalPrice(total)
  }, [quantityGames])

  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    const items = quantityGames.reduce((acc, game) => {
      return acc + game.quantity
    }, 0)
    setTotalProducts(items)
  }, [quantityGames])

  const handleFinishOrder = async () => {
    try {
      const response = await axios.post(`${API}/finishOrder`, {
        id: userData.id,
        gamesData: quantityGames,
        totalPrice: totalPrice,
        products: totalProducts,
      })
      if (response.status === 201) {
        navigate('/')
        fetchUserData(userData.id)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleClearCart = async () => {
    try {
      const response = await axios.delete(`${API}/clearCart`, { data: {id: userData.id}})
      if (response.status === 200) {
        navigate('/')
        fetchUserData(userData.id)
      }
    } catch (error) {
      
    }
  }

  const handleCheckData = () => {
    const newEmptyErrors = {};
  
    parts.forEach(part => {
      part.inputs.forEach(info => {
        if (info.field === 'confirmPassword') {
          newEmptyErrors.confirmPassword = info.value !== formData.newPassword;
        } else {
          newEmptyErrors[info.field] = info.value.length < 2 || info.value === '';
        }
      });
    });
  
    setEmptyErrors(newEmptyErrors);
  
    const checkErrors = Object.values(newEmptyErrors).every(value => value === false);
    return checkErrors;
  };
  

  const [admin, setAdmin] = useState(false)
  const [update, setUpdate] = useState(false)
  const handleUpdateUserData = async () => {
    if (handleCheckData()) {
      try {
          const response = await axios.post(`${API}/updateData`, {userData, formData})
          if (response.status === 200) {
            fetchUserData(userData.id)
            setAdmin(false)
            setUpdate(true)
            setFormData(prev => ({
              ...prev,
              newPassword: ''
            }))
            setFormData(prev => ({
              ...prev,
              confirmPassword: ''
            }))
          } else if (response.status === 203) {
            setAdmin(true)
          }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const removeGame = async (id) => {
    try {
      const response = await axios.delete(`${API}/removeGameId`, {
        data: {
          userId: userData.id,
          id: id,
        }
      })
      if (response.status === 200) {
        fetchUserData(userData.id)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    cardWidth,
    cardsCon,
    correctCard,
    parts,
    updateFields,
    orderArrowMange,
    sortedOrders,
    quantityGames,
    totalPrice,
    gameWidth,
    handleShowCorrectCard,
    handleChangeSearch,
    handleChangeUpdateFields,
    handleChangeData,
    handleButtonChangeQuantity,
    handleChangeQuantity,
    handleChangeArrow,
    totalProducts,
    handleFinishOrder,
    handleClearCart,
    handleUpdateUserData,
    admin,
    update,
    removeGame,
  }
}

export default Profile

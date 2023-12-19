import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './UserCart.css'
import { ActiveStatus } from '../../ActiveStatus';
import { IoIosArrowDown } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

import UserCartJS from '../../hooks/UserCart';
const UserCart = () => {
  const { isActive, userData } = useContext(ActiveStatus)
  const navigate = useNavigate()
  const {
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
  } = UserCartJS()
  const [contact, setContact] = useState(false)

  useEffect(() => {
    if (!isActive) {
      navigate('/')
    }
  }, [isActive, navigate])

  return (
    <>
    <div className='background'></div>
    <div className='UserCart'>
      <div className='con' ref={conWidth}>
        <div className='games'>
          {quantityGames.map((game, index) => (
            <div className='game' key={index}>
              <Link to={`/game/${game.name}`} className='img' style={{ width: gameWidth, minWidth: gameWidth, height: gameWidth * 1.5}}>
                <img src={game.image} alt="" />
              </Link>
              <div className='text'>
                <div className='namePrice'>
                  <h2>{game.name}</h2>
                  <strong><span>{game.price}</span>$</strong>
                </div>
                <p>{game.category}</p>
                <div className='btn'>
                  <button onClick={() => handleButtonQuantity('remove', game.id)}>-</button>
                  <input 
                    id={game.name}
                    type="text"
                    value={game.quantity}
                    onChange={(e) => handleChangeQuantity(game.id, e)}
                  />
                  <label htmlFor={game.name}></label>
                  <button onClick={() => handleButtonQuantity('add', game.id)}>+</button>
                </div>
                <div className='trash'>
                  <FaTrashAlt onClick={() => removeGame(game.gameId)} className='icon'/>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='sticky'>
          <div className='box'>
            <div className='header'>
              <h2>Summary</h2>
            </div>
            <div className='prices'>
              {quantityGames.map((game, index) => (
                <div className='game' key={index}>
                  <p>{game.name}</p>
                  <p>{game.quantity}</p>
                </div>
              ))}
            </div>
            <div className='total'>
              <div className='price'></div>
              <div className='sum'>
                <h3>Products:</h3>
                <p>{parseInt(totalProducts).toLocaleString()}</p>
              </div>
              <div className='sum'>
                <h3>Total:</h3>
                <p><span>{totalPrice.toFixed(2)}</span> USD</p>
              </div>
            </div>
            <div className='contact'>
              <h2 onClick={() => setContact(!contact)}>Contact Information <IoIosArrowDown className={`arrow ${contact && 'rotate'}`}/></h2>
              {contact &&
                <>
              <div className='earch'>
                <h4>Email:</h4>
                <p>{userData.email}</p>
              </div>
              <div className='earch'>
                <h4>Name:</h4>
                <p>{userData.firstName}</p>
              </div>
              <div className='earch'>
                <h4>Phone:</h4>
                <p>{userData.phone}</p>
              </div>
                </>
              }
            </div>
            <div className='btn'>
              <button onClick={removeOrder}>Delete</button>
              <button onClick={finishOrder}>Finish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserCart

import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Profile.css'

import { IoIosArrowUp } from "react-icons/io";

import empty from '../../assets/empty.png'

import NavBar from '../NavBar/NavBar'

import { ActiveStatus } from '../../ActiveStatus';

import ProfileJS from '../../hooks/Profile';
const Profile = () => {

  const {
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
    handleChangeSearch,
    handleShowCorrectCard,
    handleChangeUpdateFields,
    handleChangeData,
    handleButtonChangeQuantity,
    handleChangeQuantity,
    handleFinishOrder,
    handleChangeArrow,
    totalProducts,
    handleClearCart,
    handleUpdateUserData,
    admin,
    update,
    removeGame,
  } = ProfileJS()
  const navigate = useNavigate()
  const { isActive } = useContext(ActiveStatus)

  useEffect(() => {
    if (!isActive) {
        navigate('/');
    }
}, [isActive, navigate]);


  return (
    <>
    <div className='background'></div>
    <NavBar />
    <div className='Profile'>

      <div className='section' ref={cardWidth}>
        <div className='header'>
          <h2>My Dashboard</h2>
        </div>
        <div className='cardsCon'>
          {cardsCon.map((info, index) => (
            <div className={`card ${correctCard === info.number && 'color'} ${info.valid === 0 && 'hide'}`} onClick={() => handleShowCorrectCard(info.number)} key={index}>
              <info.icon id='icon'/>
              <p>{info.text}</p>
            </div>
          ))}
        </div>
        <div className='cardInfo'>
          <div className={`correctCard ${correctCard === 1 && 'show'}`}>
            <div className='text'>
              <h2>Account Settings</h2>
            </div>
            {parts.map((info, index) => (
              <div className='part' key={index}>
                <div className='manage'>
                  <h2>{info.head}</h2>
                  <div className='p'>
                    {info.data.map((p, indexP) => (
                      <p key={indexP}>{p}</p>
                    ))}
                  </div>
                  <h2 className={`${updateFields[info.field] && 'bold'}`} onClick={() => handleChangeUpdateFields(info.field)}>{updateFields[info.field] ? 'Hide' : 'Change'}</h2>
                </div>
                <div className={`update ${updateFields[info.field] && 'show'}`}>
                  <div className='inputs'>
                    {info.inputs.map((input, indexInput) => (
                      <div className='input' key={indexInput}>
                        <input 
                          id={input.id}
                          type={input.type}
                          placeholder=''
                          value={input.value}
                          onChange={(e) => handleChangeData(input.field, e, input.maxSymbols)}
                          autoComplete='false'
                        />
                        <label htmlFor={input.id}>{input.label}</label>
                        <p>{input.error && "Please enter a value."}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className='buttons'>
              <button onClick={handleUpdateUserData}>Update Data</button>
              {update && <p>Successfuly change your Data!</p>}
              {admin && <p>Your can't change Admin Profile</p>}
            </div>
          </div>
          <div className={`correctCard ${correctCard === 2 && 'show'}`}>
            <div className='text'>
              <h2>Ordered Items</h2>
              <input 
                id='searchById'
                type="text"
                value={orderArrowMange.search}
                onChange={(e) => handleChangeSearch(e)}
                placeholder='Search By ID'
              />
            </div>
            <div className='info'>
              <p onClick={() => handleChangeArrow('date')}>Date<IoIosArrowUp className={`arrow ${orderArrowMange.date === 1 ? 'one' : orderArrowMange.date === 2 && 'two'}`}/></p>
              <p onClick={() => handleChangeArrow('products')}>Products<IoIosArrowUp className={`arrow ${orderArrowMange.products === 1 ? 'one' : orderArrowMange.products === 2 && 'two'}`}/></p>
              <p onClick={() => handleChangeArrow('orderId')}>OrderID<IoIosArrowUp className={`arrow ${orderArrowMange.orderId === 1 ? 'one' : orderArrowMange.orderId === 2 && 'two'}`}/></p>
              <p onClick={() => handleChangeArrow('total')}>Total<IoIosArrowUp className={`arrow ${orderArrowMange.total === 1 ? 'one' : orderArrowMange.total === 2 && 'two'}`}/></p>
            </div>
            {sortedOrders.length > 0 ? (
              sortedOrders.map((info, index) => (
                <div className='order' key={index}>
                  <div className='data'>
                    <p>{info.date}</p>
                  </div>
                  <div className='data'>
                    <p>{parseInt(info.products).toLocaleString()}</p>
                  </div>
                  <div className='data'>
                    <p>{info.id}</p>
                  </div>
                  <div className='data'>
                    <p>{parseInt(info.total).toLocaleString()}$</p>
                  </div>
                  <div className='data'>
                    <Link to={`/order/${info.id}`}>Details</Link>
                  </div>
                  <div className='mobile-data'>
                    <strong>Date</strong>
                    <p>{info.date}</p>
                  </div>
                  <div className='mobile-data'>
                    <strong>Products</strong>
                    <p>{parseInt(info.products).toLocaleString()}</p>
                  </div>
                  <div className='mobile-data'>
                    <strong>OrderID</strong>
                    <p>{info.id}</p>
                  </div>
                  <div className='mobile-data'>
                    <strong>Total</strong>
                    <p>{parseInt(info.total).toLocaleString()}$</p>
                  </div>
                  <div className='mobile-data'>
                    <Link to={`/order/${info.id}`}>Details</Link>
                  </div>
                </div>
              ))
            ) : (
              <div className='imgCon'>
                <div className='img'>
                  <img src={empty} alt="" />
                </div>
              </div>
            )}
          </div>
          <div className={`correctCard ${correctCard === 3 && 'show'}`}>
            <div className='text'>
              <h2>Your Cart</h2>
            </div>
            <div className='cart'>
              <div className='games'>
                {quantityGames.map((info, index) => (
                  <div className='game' key={index}>
                    <Link to={`/game/${info.name}`} className='img' style={{ width: gameWidth, minWidth: gameWidth, height: gameWidth * 1.5}}>
                      <img src={info.image} alt="" />
                    </Link>
                    <div className='infoGame'>
                      <h2>{info.name}</h2>
                      <p>{info.category}</p>
                      <strong><span>Price:</span> {info.price}$</strong>
                      <div className='btn'>
                        <button onClick={() => handleButtonChangeQuantity(info.gameId, 'remove')}>-</button>
                        <input
                          id={`${info.name}`}
                          type="text"
                          value={info.quantity} 
                          onChange={(e) => handleChangeQuantity(info.gameId, e)}
                        />
                        <label htmlFor={`${info.name}`}></label>
                        <button onClick={() => handleButtonChangeQuantity(info.gameId, 'add')}>+</button>
                      </div>
                      <button onClick={() => removeGame(info.gameId)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='stiky'>
                <div className='box'>
                  <h2>Your Order:</h2>
                  {quantityGames.map((game, index) => (
                    <div className='line' key={index}>
                      <p>{game.name}</p>
                      <p>{(game.price * game.quantity).toFixed(2)}$</p>
                    </div>
                  ))}
                  <div className='total'>
                    <div className='earch'>
                      <strong>Total:</strong>
                      <p>{parseFloat(totalPrice).toLocaleString()}$</p>
                    </div>
                    <div className='earch'>
                      <strong>Items:</strong>
                      <p>{parseInt(totalProducts).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className='btn'>
                    <button onClick={handleClearCart}>Delete</button>
                    <button onClick={handleFinishOrder}>Finish Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Profile

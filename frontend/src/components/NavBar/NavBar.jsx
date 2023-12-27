import React, { useContext, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { ActiveStatus } from '../../ActiveStatus'
import { MdEmail, MdOutlineLogout } from "react-icons/md";
import { FaLock, FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import NavBarJS from '../../hooks/NavBar'
const NavBar = () => {

  const {
    handleChangeValues,
    uncorrectLogin,
    sendLoginData,
    filteredGames,
    values,
    clearSearch,
  } = NavBarJS()
  const { isActive, cartData, login, setLoginBar, loginBar } = useContext(ActiveStatus)

  const [openNavBar, setOpenNavBar] = useState(false)

  return (
    <>
    <div className={`NavBar ${openNavBar && 'fixed'}`}>
      <nav>
        <div className='logo'>
          <Link to='/'>
            <h1>Niki100</h1>
          </Link>
        </div>
        <div className='search'>
          <input 
            id='search'
            type="text"
            placeholder='Seach game'
            value={values.search}
            onChange={(e) => handleChangeValues('search', e.target.value, 25)}
          />
          <label htmlFor="search"></label>
          <div className='results'>
            {filteredGames.slice(0, 7).map((info, index) => (
              <Link to={`/game/${info.name}`} onClick={clearSearch} className='game' key={index}>
                <p>{info.name}</p>
                <strong><span>{info.price}</span>$</strong>
              </Link>
            ))}
          </div>
        </div>
        <ul className={`${openNavBar && 'open'}`}>
            <li onClick={() => setOpenNavBar(!openNavBar)}>
              <Link to='/'>
                <span>Home</span>
                <FaHome className='icon'/>
              </Link>
            </li>
            {!isActive ? (
              <>
                <li onClick={() => { setLoginBar(!loginBar); setOpenNavBar(!openNavBar); }}>
                  <Link>
                    <span>Login</span>
                    <MdOutlineLogout className='icon'/>
                  </Link>
                </li>
                <li onClick={() => setOpenNavBar(!openNavBar)}>
                  <Link to='/register'>
                    <span>Register</span>
                    <IoMdAddCircle className='icon'/>
                  </Link>
                </li>
              </>
            ) : (
              <>
              <li onClick={() => setOpenNavBar(!openNavBar)}>
                <Link to='/profile'>
                  <span>Profile</span>
                  <FaUser className='icon'/>
                </Link>
              </li>
              {cartData.length > 0 &&
                <li onClick={() => setOpenNavBar(!openNavBar)}>
                  <Link to='/usercart'>
                    <span>Your Card</span>
                    <FaShoppingCart className='icon'/>
                  </Link>
                </li>
              }
              </>
            )}
        </ul>
        <div className='mobile-navbar' onClick={() => setOpenNavBar(!openNavBar)}>
          <span className={`${openNavBar && 'rotate'}`}></span>
          <span className={`${openNavBar && 'rotate'}`}></span>
          <span className={`${openNavBar && 'rotate'}`}></span>
        </div>
      </nav>
    </div>
    {loginBar &&
    <div className='loginBar'>
      <div className='bg-navbar' onClick={() => setLoginBar(!loginBar)}></div>
      <div className='box'>
        <div className='logo'>
          <h1>Niki100</h1>
        </div>
        <div className='navigate'>
          <strong>Login</strong>
          <Link to='/register'  onClick={() => setLoginBar(!loginBar)}>register</Link>
        </div>
        <div className='input'>
          <input 
            id='niki100GamesEmail'
            type="email" 
            placeholder=''
            value={values.email}
            onChange={(e) => handleChangeValues('email', e.target.value, 25)}
            autoComplete='false'
          />
          <label htmlFor="niki100GamesEmail">Enter Your Email</label>
          <MdEmail className='icon'/>
        </div>
        <div className='input'>
          <input
            id='GamesNiki100password'
            type="password"
            placeholder='' 
            value={values.password}
            onChange={(e) => handleChangeValues('password', e.target.value, 25)}
            style={{ WebkitTextSecurity: 'disc' }}
          />
          <label htmlFor="GamesNiki100password">Enter Your Password</label>
          <FaLock className='icon'/>
          {uncorrectLogin && <p>Email or Password is Uncorrect!</p>}
        </div>
        <button onClick={() => {login(1); setLoginBar(!loginBar)}}>as admin</button>
        <button onClick={sendLoginData}>login</button>
      </div>
    </div>
    }
    {openNavBar &&
    <div className='bg-bar' onClick={() => setOpenNavBar(!openNavBar)}></div>
    }
    </>
  )
}

export default NavBar

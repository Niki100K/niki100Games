import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import './AboutGame.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ActiveStatus } from '../../ActiveStatus'
import { FaStar, FaHeadset } from "react-icons/fa";
import { RxCountdownTimer } from "react-icons/rx";
import { FaBasketShopping } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import axios from 'axios'

import multiPlayer from '../../assets/multiPlayer.png'
import Simulation from '../../assets/Simulation.png'
import Adventure from '../../assets/Adventure.png'
import Strategy from '../../assets/strategy.png'
import Survival from '../../assets/Survival.png'
import Fighting from '../../assets/Fighting.png'
import Hunting from '../../assets/Hunting.png'
import Action from '../../assets/Action.png'
import Puzzle from '../../assets/Puzzle.png'
import Sports from '../../assets/Sports.png'
import BattleRoyale from '../../assets/Battle Royale.png'
import RolePlaying from '../../assets/Role-Playing.png'
import FirstPerson from '../../assets/First-Person.png'
import OpenWorld from '../../assets/Open World.png'

import threads from '../../assets/threads.png'
import twitter from '../../assets/twitter.png'
import instagram from '../../assets/instagram.png'
import facebook from '../../assets/facebook.png'
import telegram from '../../assets/telegram.png'

import discount from '../../assets/discount.png'

import AboutGameJS from '../../hooks/AboutGame';

const AboutGame = () => {
    const navigate = useNavigate()
    const {
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
    } = AboutGameJS()
    const {
        isActive,
        cartData,
        gamesData,
    } = useContext(ActiveStatus)

  return (
    <>
    {/* <div className='background'></div> */}
    <div className='AboutGame'>
        <div className='con' ref={gameRef}>
            <div className='games'>
                <div className='game'>
                    <div className='img' style={{minWidth: gameImgSize, height: gameImgSize * 1.5}}>
                        <img src={gameData.image} alt="" />
                    </div>
                    <div className='text'>
                        <h2>{gameData.name}</h2>
                        <div className='starsCon'>
                            {Array.from({length: gameData.star}, (_, index) => (
                                <FaStar id='star' key={index}/>
                            ))}
                        </div>
                            <p>{gameData.star} / 5 rating</p>
                        <div className='category'>
                            <h2>{gameData.category}</h2>
                            <img src={correctIconCategory} alt="" />
                        </div>
                        <div className='discount'>
                            <strong>{gameData.price}$</strong>
                            <img src={discount} alt="" />
                        </div>
                    </div>
                </div>
                <div className='mobileOrder'>
                    <div className='header'>
                        <h2>{gameData.price}</h2>
                        <p>$</p>
                    </div>
                    <div className='btn'>
                    {!isActive &&
                        <button>Login</button>
                    }
                    {!cartData.filter(game => game.name === gameData.name).length > 0 ? (
                        <button onClick={handleAddGame}>{!loadingData ? 'Add Game' : 'Adding'}</button>
                    ) : (
                        <button onClick={handleRemoveGame}>{!loadingData ? `Remove` : 'Removing'}</button>
                    )}
                    {cartData.length > 0 &&
                        <button onClick={() => navigate('/usercart')}>{cartData.length > 0 && <div className='circle'>{cartData.length}</div>}Check Cart</button>
                    }
                    </div>
                </div>
                <div className='recommended' ref={recommendGameRef}>
                    <div className='header'>
                        <h2>Gamers also viewed</h2>
                    </div>
                    <div className='recGames'>
                        {gamesData.filter(game => game.category === gameData.category && game.name !== gameData.name).slice(0, 8).map((game, index) => (
                            <Link to={`/game/${game.name}`} className='gameR' key={index}>
                                <div className='img' style={{ width: recommendedGameImgSize ,minWidth: recommendedGameImgSize, height: recommendedGameImgSize * 1.5}}>
                                    <img src={game.image} alt="" />
                                    <div className='info'>
                                        <p>{game.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='description'>
                    <div className='header'>
                        <h2>Product description</h2>
                        <div className='box'>
                            <strong>{gameData.name}</strong>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde asperiores est accusamus totam culpa saepe magni distinctio possimus, itaque numquam optio. Voluptatem quisquam dicta rem quia eius earum consectetur? Molestias ea sit consequatur aliquid laborum explicabo quibusdam doloremque libero dolorem quia? Eius quae ratione molestiae. Quod officia quisquam aspernatur temporibus, cupiditate similique eligendi ullam nostrum tenetur eius dolores cum, est voluptas blanditiis sequi perspiciatis.</p>
                        </div>
                    </div>
                </div>
                <div className='social'>
                    <div className='header'>
                        <h2>Social Links</h2>
                    </div>
                    <div className='links'>
                    {socials.map((social, index) => (
                        <a href={social.link} key={index}>
                            <img src={social.img} alt="" />
                        </a>
                    ))}
                    </div>
                </div>
            </div>
            <div className='sticky'>
                <div className='price'>
                    <h2>{gameData.price}</h2>
                    <p>$</p>
                </div>
                <div className='btn'>
                    {!isActive &&
                        <button>Login</button>
                    }
                    {!cartData.filter(game => game.name === gameData.name).length > 0 ? (
                        <button onClick={handleAddGame}>{!loadingData ? 'Add Game' : 'Adding'}</button>
                    ) : (
                        <button onClick={handleRemoveGame}>{!loadingData ? `Remove` : 'Removing'}</button>
                    )}
                    {cartData.length > 0 &&
                        <button onClick={() => navigate('/usercart')}>{cartData.length > 0 && <div className='circle'>{cartData.length}</div>}Check Cart</button>
                    }
                </div>
                <div className='icons'>
                    {icons.map((line, index) => (
                        <div className='line' key={index}>
                            <div className='icon'>
                                <line.icon />
                            </div>
                            <p>{line.p}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AboutGame

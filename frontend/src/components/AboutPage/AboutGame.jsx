import React, { useContext } from 'react'
import './AboutGame.css'
import { Link, useNavigate } from 'react-router-dom'
import { ActiveStatus } from '../../ActiveStatus'

import { FaCartShopping, FaStar } from "react-icons/fa6";
import { MdAdd, MdOutlineRemove } from "react-icons/md";

import AboutGameJS from '../../hooks/AboutGame'
const AboutGame = () => {
    const navigate = useNavigate()
    const { gamesData, cartData, isActive } = useContext(ActiveStatus)

    const {
        conWidth,
        gameWidth,
        moreGamesWidth,
        gameData,
        handleAddGame,
        handleRemoveGame,
        name,
        moreGames,
        loadingData,
    } = AboutGameJS()

  return (
    <div className='AboutGame'>
      <div className='con' ref={conWidth}>
        <div className='about'>
            <div className='game'>
                <div className='img' style={{width: gameWidth, minWidth: gameWidth, height: gameWidth * 1.5}}>
                    <img src={gameData.image} alt="" />
                </div>
                <div className='info'>
                    <h2>{gameData.name}</h2>
                    <strong>{gameData.category}</strong>
                    <h3>Description</h3>
                    <p>{gameData.description}</p>
                    <div className='stars'>
                        {Array.from({ length: gameData.star }, (_, index) => (
                            <FaStar key={index} className='star'/>
                        ))}
                    </div>
                </div>
            </div>
            <div className='stiky mobile'>
                {isActive &&
                    <div className='box'>
                        <div className='header'>
                            <h2>Manage Game:</h2>
                        </div>
                        <div className='btn'>
                            {cartData.filter(game => game.name === name).length === 0 ? (
                                <button className='manage' onClick={handleAddGame}><MdAdd className='symbol'/>{loadingData ? 'Adding' : 'Add'}</button>
                            ) : (
                                <button className='manage' onClick={handleRemoveGame}><MdOutlineRemove className='symbol'/>{loadingData ? 'Removeing' : 'Remove'}</button>
                            )}
                            {cartData.length > 0 &&
                                <button className='cart' onClick={() => navigate('/usercart')}><FaCartShopping className='icon'/>Check Cart <div className='totalProducts'>{cartData.length}</div></button>
                            }
                        </div>
                    </div>
                }
        </div>
            <div className='moreGames' ref={moreGames}>
                {gamesData.filter(prev => prev.category === gameData.category).length >= 10 ? (
                <>
                    <div className='header'>
                        <h2>Recommended:</h2>
                    </div>
                    <div className='games'>
                        {gamesData.filter(prev => prev.category === gameData.category && prev.name !== gameData.name).slice(0, 10).map((game, index) => (
                            <Link to={`/game/${game.name}`} className='game' style={{width: moreGamesWidth, minWidth: moreGamesWidth}} key={index}>
                                <div className='img' style={{width: moreGamesWidth, height: moreGamesWidth * 1.5}}>
                                    <img src={game.image} alt="" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
                ) : (
                <>
                    <div className='header'>
                        <h2>Recommended:</h2>
                    </div>
                    <div className='games'>
                        {gamesData.filter(prev => prev.name !== gameData.name).slice(0, 10).map((game, index) => (
                            <Link to={`/game/${game.name}`} className='game' style={{width: moreGamesWidth, minWidth: moreGamesWidth}} key={index}>
                                <div className='img' style={{width: moreGamesWidth, height: moreGamesWidth * 1.5}}>
                                    <img src={game.image} alt="" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
                )}
            </div>
        </div>
        <div className='stiky'>
            {isActive &&
                <div className='box'>
                    <div className='header'>
                        <h2>Manage Game:</h2>
                    </div>
                    <div className='btn'>
                        {cartData.filter(game => game.name === name).length === 0 ? (
                            <button className='manage' onClick={handleAddGame}><MdAdd className='symbol'/>{loadingData ? 'Adding' : 'Add'}</button>
                        ) : (
                            <button className='manage' onClick={handleRemoveGame}><MdOutlineRemove className='symbol'/>{loadingData ? 'Removeing' : 'Remove'}</button>
                        )}
                        {cartData.length > 0 &&
                            <button className='cart' onClick={() => navigate('/usercart')}><FaCartShopping className='icon'/>Check Cart <div className='totalProducts'>{cartData.length}</div></button>
                        }
                    </div>
                </div>
            }
        </div>
      </div>
    </div>
  )
}

export default AboutGame

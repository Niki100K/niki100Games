import React from 'react';
import { Link } from 'react-router-dom'

import './MainPage.css';
import { IoIosArrowDown } from "react-icons/io";

import MainPageJS from '../../hooks/MainPage';
const MainPage = () => {

  const {
    paginationButtons,
    displayedItems,
    filterState,
    search,
    
    priceRangeState,
    priceSort,
    price,

    handleChangePriceRange,
    handleChangeCategory,
    handlePageChange,
    filteredGames,
    handleSearch,
    handleSort,

    setShowMoveCategories,
    setOpenMobileSettings,
    showMoveCategories,
    openMobileSettings,
    gamesConRef,
    gameHeight,
    gameWidth,
  } = MainPageJS()


  return (
    <>
      <div className={`mobile-settings ${openMobileSettings && 'show'}`}>
        <div className='sticky-btn' onClick={() => setOpenMobileSettings(!openMobileSettings)}>
          <IoIosArrowDown className='icon'/>
          <p>filter</p>
        </div>
        <div className='search'>
          <h3>Seach game</h3>
          <input id='gamename' type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder='Seach Game' />
          <label htmlFor="gamename"></label>
          <div className='results'>
            {filteredGames.map((game, index) => (
              <Link to={`/game/${game.name}`} className='line' key={index}>
                <p>{game.name}</p>
                <h6><span>{game.price}</span>$</h6>
              </Link>
            ))}
          </div>
        </div>
        <div className='category'>
          <h2>Category</h2>
          <div className={`con ${showMoveCategories && 'show'}`}>
            {Object.keys(filterState).map((category, index) => (
              <p onClick={() => handleChangeCategory(category)} className={`${filterState[category] && 'active'}`} key={index}>{category}</p>
            ))}
          </div>
          <button onClick={() => setShowMoveCategories(!showMoveCategories)}>show more <IoIosArrowDown className={`icon ${showMoveCategories && 'rotate'}`}/></button>
        </div>  
        <div className='priceRange'>
          <h2>Price Range</h2>
          <div className='con'>
            {price.map((range, index) => (
              <p 
              onClick={() => (handleChangePriceRange(range.max, range.min, range.range))} 
              className={`${priceRangeState[range.range] && 'active'}`} key={index}>{range.p}</p>
            ))}
          </div>
        </div>
        <div className='priceSort'>
          <h2>Sort By</h2>
          <div className='con'>
            <p onClick={() => handleSort(1)} className={`${priceSort === 1 && 'active'}`}>Low-High</p>
            <p onClick={() => handleSort(2)} className={`${priceSort === 2 && 'active'}`}>High-Low</p>
          </div>
        </div>
      </div>    
      <div className='MainPage'>
        <div className='sticky-mobile-filter'>
          <p onClick={() => setOpenMobileSettings(!openMobileSettings)}>filter</p>
        </div>
        <div className='con'>
          <div className='settings'>
            <h3>Category</h3>
            <div className='category'>
              {Object.keys(filterState).map((category, index) => (
                <p onClick={() => handleChangeCategory(category)} className={`${filterState[category] && 'active'}`} key={index}>{category}</p>
              ))}
            </div>
            <h3>Price Range</h3>
            <div className='price-range'>
              {price.map((range, index) => (
                <p 
                onClick={() => (handleChangePriceRange(range.max, range.min, range.range))} 
                className={`${priceRangeState[range.range] && 'active'}`} key={index}>{range.p}</p>
              ))}
            </div>
            <h3>Sort By</h3>
            <div className='price-sort'>
              <p onClick={() => handleSort(1)} className={`${priceSort === 1 && 'active'}`}>Low-High</p>
              <p onClick={() => handleSort(2)} className={`${priceSort === 2 && 'active'}`}>High-Low</p>
            </div>
          </div>
          <div className='games-con' ref={gamesConRef}>
            {displayedItems.map((game, index) => (
              <Link to={`/game/${game.name}`} className='game' style={{ width: gameWidth}} key={index}>
                <div className='img' style={{ width: gameWidth, height: gameHeight}}>
                  <img src={game.image} alt="" loading='lazily'/>
                </div>
                <div className='info'>
                  <h2>{game.name}</h2>
                  <p>{game.category}</p>
                  <span>${game.price}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
        <div className='pagination'>
          {paginationButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => {
                if (button.page) {
                  handlePageChange(button.page);
                }
              }}
              className={button.isActive ? 'active' : ''}
            >
              {button.ellipsis ? '...' : button.page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainPage;

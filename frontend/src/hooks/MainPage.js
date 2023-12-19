import { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { ActiveStatus } from '../ActiveStatus';
const MainPage = () => {

  const { gamesData } = useContext(ActiveStatus);
  const [filteredGamesData, setFilteredGamesData] = useState([]);
  const [priceSort, setPriceSort] = useState(0)
  const itemsPerPage = 30;
  const [search, setSearch] = useState('')
  const gamesConRef = useRef(null);

  const [showMoveCategories, setShowMoveCategories] = useState(false)
  const [openMobileSettings, setOpenMobileSettings] = useState(false)
  const [gameWidth, setGameWidth] = useState(0)
  const [gameHeight, setGameHeight] = useState(0)

  const [filterState, setFilterState] = useState({
    Multiplayer: false,
    Simulation: false,
    Adventure: false,
    Strategy: false,
    Survival: false,
    Fighting: false,
    Hunting: false,
    Action: false,
    Puzzle: false,
    Sports: false,
    'Battle Royale': false,
    'Role-Playing': false,
    'First-Person': false,
    'Open World': false,
  });
  const [priceRangeState, setPriceRangeState] = useState({
    price0to29: false,
    price30to69: false,
    price70to99: false,
    price100to149: false,
    price150to199: false,
  });
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  
  const price = [
    {
      p: '0$ - 29.99$',
      range: 'price0to29',
      max: 29.99,
      min: 0,
    },
    {
      p: '30$ - 69.99$',
      range: 'price30to69',
      max: 69.99,
      min: 30,
    },
    {
      p: '70$ - 99.99$',
      range: 'price70to99',
      max: 99.99,
      min: 70,
    },
    {
      p: '100$ - 149.99$',
      range: 'price100to149',
      max: 149.99,
      min: 100,
    },
    {
      p: '150$ - 199.99$',
      range: 'price150to199',
      max: 199.99,
      min: 150,
    },
  ]
  const handleChangeCategory = (category) => {
    setFilterState(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }
  const handleChangePriceRange = (max, min, range) => {
    if (max === maxPrice && min === minPrice) {
      setMaxPrice(0)
      setMinPrice(0)
    } else {
      setMaxPrice(max)
      setMinPrice(min)
    }
    setPriceRangeState(prev => {
      const filter = {}
      for (const key in prev) {
        filter[key] = key === range ? !prev[key] : false
      }
      return filter
    })
  };
  const handleSort = (value) => {
    if (value === priceSort) {
      setPriceSort(0)
    } else {
      setPriceSort(value)
    }
  }
  useEffect(() => {
    const correctCategories = Object.keys(filterState).filter(category => filterState[category])
    
    const filteredGames = gamesData.filter(game => {
      const setCategories = correctCategories.length === 0 || correctCategories.includes(game.category)
      const setPriceRange  = (minPrice === 0 && maxPrice === 0) || (game.price > minPrice && game.price < maxPrice)
      return setCategories && setPriceRange
    })
    if (priceSort === 1) {
      filteredGames.sort((a, b) => a.price - b.price)
    } else if (priceSort === 2) {
      filteredGames.sort((a, b) => b.price - a.price) 
    }
    setFilteredGamesData(filteredGames)
  }, [gamesData, filterState, minPrice, maxPrice, priceSort])
  
  const totalPages = Math.ceil(filteredGamesData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const totalPages = Math.ceil(filteredGamesData.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredGamesData, currentPage, itemsPerPage]);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredGamesData.slice(startIndex, endIndex);

  const maxDisplayedButtons = 3;
  let startPage = Math.max(currentPage - Math.floor(maxDisplayedButtons / 2), 1);
  let endPage = startPage + maxDisplayedButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxDisplayedButtons + 1, 1);
  }

  const paginationButtons = [];
  if (startPage > 1) {
    paginationButtons.push({
      page: 1,
      isActive: currentPage === 1,
    });
    if (startPage > 2) {
      paginationButtons.push({ ellipsis: true });
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push({
      page: i,
      isActive: currentPage === i,
    });
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationButtons.push({ ellipsis: true });
    }
    paginationButtons.push({
      page: totalPages,
      isActive: currentPage === totalPages,
    });
  }
  const handleSearch = (value) => {
    setSearch(value)
  }
  const [filteredGames, setFilteredGames] = useState([])

  useEffect(() => {
    const searchedGames = gamesData.filter(game => {
      return search.length > 2 &&
        (game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.name.toLowerCase().startsWith(search.toLowerCase()));
    });
    setFilteredGames(searchedGames);
  }, [search, gamesData]);











  

  









  const logInfo = useCallback(() => {
    let clientWidth = gamesConRef.current.clientWidth
    if (window.innerWidth > 980) {
      setGameWidth(clientWidth / 5.2)
      setGameHeight((clientWidth / 5.2) * 1.5)
    }
    if (window.innerWidth < 980) {
      setGameWidth(clientWidth / 3.2)
      setGameHeight((clientWidth / 3.2) * 1.5)
    }
    if (window.innerWidth < 780) {
      setGameWidth(clientWidth / 4.2)
      setGameHeight((clientWidth / 4.2) * 1.5)
    }
    if (window.innerWidth < 580) {
      setGameWidth(clientWidth / 3.2)
      setGameHeight((clientWidth / 3.2) * 1.5)
    }
    if (window.innerWidth < 380) {
      setGameWidth(clientWidth / 2.1)
      setGameHeight((clientWidth / 2.1) * 1.5)
    }
  }, [])

  useEffect(() => {
    logInfo();
  }, [logInfo]);

  useEffect(() => {
    window.addEventListener('resize', logInfo);
    return () => {
      window.removeEventListener('resize', logInfo);
    };
  }, [logInfo]);






  return {
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
  };
};

export default MainPage;

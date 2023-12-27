import { useContext, useEffect, useState } from 'react'
import { ActiveStatus } from '../ActiveStatus'
import axios from 'axios'

const NavBar = () => {

  const { login, gamesData, API, setLoginBar, loginBar } = useContext(ActiveStatus)


  const [values, setValues] = useState({
    email: '',
    password: '',
    search: '',
  })

  const handleChangeValues = (field, value, maxSymbols) => {
    setValues(prev => ({
      ...prev,
      [field]: value.length > maxSymbols ? value.slice(0, maxSymbols) : value
    }))
  }

  const checkData = () => {
    return values.email.length > 3 && values.password.length > 3
  }

  const [uncorrectLogin, setUncorrectLogin] = useState(false)
  const sendLoginData = async () => {
    if (checkData()) {
      try {
        const response = await axios.get(`${API}/login`, {
          params: {
            email: values.email,
            password: values.password,
          }
        })
        if (response.status === 200) {
          login(response.data)
          setLoginBar(!loginBar)
        } else if (response.status === 204) {
          setUncorrectLogin(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  
  const [filteredGames, setFilteredGames] = useState([])



  useEffect(() => {
    const searchedGames = gamesData.filter(game => {
      return values.search.length > 2 &&
        (game.name.toLowerCase().includes(values.search.toLowerCase()) ||
        game.name.toLowerCase().startsWith(values.search.toLowerCase()));
    });
    setFilteredGames(searchedGames);
  }, [values.search, gamesData]);



  const clearSearch = () => {
    setValues(prev => ({
      ...prev,
      search: ''
    }))
  }


  return {
    handleChangeValues,
    uncorrectLogin,
    sendLoginData,
    filteredGames,
    values,
    clearSearch,
  }
}

export default NavBar

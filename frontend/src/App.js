import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage, NavBar, AboutGame, OrderInfo, Profile, Register, UserCart } from './components'
import { ActiveProvider } from './ActiveStatus'
const App = () => {
  return (
    <ActiveProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><MainPage /><NavBar /></>} />
          <Route path='/game/:gameName' element={<><AboutGame /><NavBar /></>} />
          <Route path='/order/:id' element={<><OrderInfo /><NavBar /></>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<><Register /><NavBar /></>} />
          <Route path='/usercart' element={<><UserCart /><NavBar /></>} />
        </Routes>
      </BrowserRouter>
    </ActiveProvider>
  )
}

export default App

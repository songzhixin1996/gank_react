import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Wrap from './pages/Wrap'
import Main from './pages/Main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Wrap /> */}
        <Main />
      </BrowserRouter>
    </div>
  )
}

export default App

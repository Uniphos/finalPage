import HomePage from './pages/homePage'
import LogIn from './pages/logIn'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Info from './pages/info'

function App() {
  return (
    <div className="App">
      <div className="contant">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <LogIn /> } />
          <Route path="info/:id" element={<Info />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
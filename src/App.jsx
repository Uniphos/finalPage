import HomePage from './pages/homePage'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="contant">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
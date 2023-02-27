import { useState } from 'react'
import NoteBar from "./companants/noteBar"
import './App.css'
import NavBar from './companants/navBar'
function App() {
  const [count, setCount] = useState()

  return (
    <div className=" bg-slate-600">
      <NavBar />
      <NoteBar />
  </div>
  )
}

export default App

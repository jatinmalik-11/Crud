import Menu from './pages/home'
import Admin from './pages/admin'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path = "/" element = {<Menu/>}></Route>
    <Route path = "/admin" element = {<Admin/>}></Route>
    </Routes></BrowserRouter>
    </>
  )
}

export default App

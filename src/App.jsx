import { BrowserRouter, Routes, Route } from "react-router-dom"
import {UserList} from "./components/UserList"
import {Login} from "./components/Login"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="list" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
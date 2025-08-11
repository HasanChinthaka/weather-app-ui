import { Route, Routes } from "react-router-dom"
import SingleCard from "./interface/SingleCard"
import Home from "./interface/Home"
import Login from "./interface/Login"

const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/weather" element={<Home/>} />
      <Route path="/weather/:cityCode" element={<SingleCard />} />
    </Routes>
    </>
  )
}

export default App
import { Route, Routes } from "react-router-dom"
import SingleCard from "./interface/SingleCard"
import Home from "./interface/Home"

const App = () => {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/weather/:cityCode" element={<SingleCard />} />
    </Routes>
    </>
  )
}

export default App
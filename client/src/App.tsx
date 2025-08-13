import { Navigate, Route, Routes } from "react-router-dom"
import SingleCard from "./interface/SingleCard"
import Home from "./interface/Home"
import Login from "./interface/Login"
import PageNotFound from "./interface/PageNotFound"
import { GoogleOAuthProvider } from "@react-oauth/google"

const App = () => {
const GoogleAuthWrapper =  () =>{
  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}`}>
      <Login></Login>
    </GoogleOAuthProvider>
  )
}
  return (
    <>
    <Routes>
      <Route path="/login" element={<GoogleAuthWrapper/>} />
      <Route path="/" element={<Navigate to='/login'/>} />
      <Route path="/weather" element={<Home/>} />
      <Route path="/weather/:cityCode" element={<SingleCard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App
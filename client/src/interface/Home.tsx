import { useEffect, useState } from 'react'
import Title from '../components/Title'
import AddCity from '../components/AddCity'
import WeatherCard from '../components/WeatherCard'
import { extractCityCode } from '../utils/extractCItyCode'
import { PiSignOut } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const [codes, setCodes] = useState<string[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const cityCodes = extractCityCode();
    setCodes(cityCodes)
    checkAuth()
  }, [])
  const checkAuth = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}user/is-auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json()
      console.log(result)
      if (!result.success) {
        navigate('/')
        toast.success("Not authenticated")
      }
    }
    catch {
    }
    finally {
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}user/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json()
      if (result.success) {
        localStorage.removeItem("token");
        navigate('/')
        toast.success("Logout Successfull")
      } else {
        console.error(result?.message)
        toast.error(result?.message)
        return
      }

    }
    catch {
    }
    finally {
    }
  }
  return (
    <div className='w-screen'>
      <div
        className="flex flex-col h-128 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/assets/bg-2.png')" }}
      >
        <div className='flex justify-end items-center mx-8 mt-4'>
          <button className='flex items-center gap-2 bg-red-500 p-2 font-bold text-lg text-white rounded-2xl hover:shadow-lg hover:shadow-gray-500 hover:cursor-pointer' onClick={() => handleLogout()}>
            <PiSignOut />
            Logout
          </button>
        </div>
        <Title />
        <AddCity />
      </div>
      <div className="-mt-56 grid grid-cols-1 xl:grid-cols-2 justify-center">
        {codes && codes.map(code => (
          <div className="flex justify-center py-4">
            <WeatherCard key={code} cityCode={code} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
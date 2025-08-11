import { useEffect, useState } from 'react'
import Title from '../components/Title'
import AddCity from '../components/AddCity'
import WeatherCard from '../components/WeatherCard'
import { extractCityCode } from '../utils/extractCItyCode'

const Home = () => {
    const [codes, setCodes] = useState<string[]>([])
    useEffect(() => {
        const cityCodes = extractCityCode();
        setCodes(cityCodes)
    }, [])

    return (
        <div>
            <div
                className="flex flex-col h-128 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/src/assets/bg-2.png')" }}
            >
                <Title />
                <AddCity />
            </div>
            <div className="-mt-56 grid grid-cols-1 md:grid-cols-2 justify-center">
                {codes && codes.map(code => (
                    <div className="p-6">
                        <WeatherCard key={code} cityCode={code} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
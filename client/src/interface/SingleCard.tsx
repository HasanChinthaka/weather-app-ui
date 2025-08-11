import { useParams } from 'react-router-dom';
import SingleWeatherCard from '../components/SingleWeatherCard'
import Title from '../components/Title'

const SingleCard = () => {
  const { cityCode } = useParams();

  return (
    <div>
      <div
        className="flex flex-col h-128 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/assets/bg-2.png')" }}
      >
        <Title />
      </div>
      <div className="-mt-80 flex justify-center">
        <SingleWeatherCard cityCode={cityCode || ''} />
      </div>
    </div>
  )
}

export default SingleCard
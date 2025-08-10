import AddCity from "./components/AddCity"
import Title from "./components/Title"
import WeatherCard from "./components/WeatherCard"


const App = () => {
  return (
    <div>
      <Title />
      <AddCity />
      <div className="mt-22 flex justify-center">
        <WeatherCard />
      </div>
    </div>
  )
}

export default App
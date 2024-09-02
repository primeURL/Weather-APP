import {useEffect} from "react"
import Search from "./components/Search"
import { useWeather } from "./components/Context/weatherContext"
import { getForecastData } from "./hooks/useGetData"

const App = (): JSX.Element => {

  const contextData = useWeather()

  useEffect(() => {

    navigator.geolocation.getCurrentPosition((position) => {
        getForecastData(position.coords.latitude,position.coords.longitude)
        .then((data) => {
          console.log('d',data)
          const forecastData = { ...data.city, list: data && data.list.slice(0, 16) }
          contextData.setForecast(forecastData)
        }).catch((err)=>{
          console.log(err)
        })
    })
  }, [])

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 w-full h-full lg:h-full">
      <Search/>
    </main>
  )

}

export default App

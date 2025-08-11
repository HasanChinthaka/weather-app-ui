import { useEffect, useState } from "react";
import { FiNavigation } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { fetchData } from "../utils/fetchData";
import { getLocalTimeForTimezone } from "../utils/formatedDateTime";
import { capitalizeWords } from "../utils/capitalizeWords";
import { useNavigate } from "react-router-dom";
import Loading from "./LOading";

type props = {
    cityCode: string
}
type WeatherData = {
    name?: string;
    sys?: {
        country?: string;
        sunrise?: number;
        sunset?: number;
    };
    main?: {
        temp?: number;
        temp_min?: number;
        temp_max?: number;
        pressure?: number;
        humidity?: number;
    };
    weather?: Array<{
        icon?: string;
        description?: string;
    }>;
    wind?: {
        speed?: number;
        deg?: number;
    };
    visibility?: number;
    timezone?: number;
};

const WeatherCard = ({ cityCode }: props) => {
    const [data, setData] = useState<WeatherData>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(cityCode, setData, setLoading);
    }, [cityCode])

    const handleWeatherCard = () => {
        navigate(`/weather/${cityCode}`)
    }
    return (
        <>
            {loading ?
                <Loading />
                :
                <div className="md:w-2xl p-4 md:p-0">
                    <div className="xl:hover:scale-x-105 hover:scale-y-105 hover:cursor-pointer" onClick={() => handleWeatherCard()}>
                        <div className="relative flex justify-end md:top-10 top-8 pe-4 text-white md:text-2xl text-base">
                            <LiaTimesSolid className="text-right hover:text-blue-800 hover:font-bold hover:cursor-pointer"
                            />
                        </div>
                        <div
                            className={`${data?.weather?.[0]?.description === 'clear sky' ? 'bg-[#40b781]' : data?.weather?.[0]?.description === 'light rain' ? 'bg-[#de934f]' : data?.weather?.[0]?.description === 'broken clouds' ? 'bg-[#6249cb]' : data?.weather?.[0]?.description === 'mist' ? 'bg-[#9c3a39]' : 'bg-[#388de7]'} md:pt-12 md:pb-10 md:px-18 p-5 rounded-t-lg text-white  mx-auto bg-cover bg-no-repeat`}
                            style={{ backgroundImage: "url('/src/assets/weather-card-bg.png')" }}
                        >
                            <div className="flex justify-between items-center">
                                <div className="text-center">
                                    <h2 className="md:text-3xl text-lg font-semibold">{data?.name}, {data?.sys?.country}</h2>
                                    {data?.timezone !== undefined ? (
                                        <div className="md:text-base text-sm">
                                            {getLocalTimeForTimezone(data.timezone).toLocaleTimeString([], {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}, {" "}
                                            {getLocalTimeForTimezone(data.timezone).toLocaleDateString([], {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    ) : (
                                        'N/A'
                                    )}
                                </div>
                                <p className="md:text-5xl text-2xl font-semibold">{(data?.main?.temp?.toFixed(1))}°C</p>

                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`}
                                        alt={data?.weather?.[0]?.description}
                                        className="md:w-10 w-6"
                                    />
                                    <p className="md:text-xl text-sm">{capitalizeWords(data?.weather?.[0]?.description ?? '')}</p>

                                </div>
                                <div className="text-center">
                                    <p>Temp Min: {(data?.main?.temp_min?.toFixed(1))}°C</p>
                                    <p>Temp Max: {(data?.main?.temp_max?.toFixed(1))}°C</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#383b47] md:py-10 md:px-9 p-2 rounded-b-lg text-white flex justify-between text-base items-center">
                            <div className="flex justify-left flex-col gap-1">
                                <p>Pressure: {data?.main?.pressure}hPa</p>
                                <p>Humidity: {data?.main?.humidity}%</p>
                                <p>Visibility: {data?.visibility !== undefined ? (data.visibility / 1000).toFixed(1) + 'km' : 'N/A'}</p>
                            </div>
                            <hr className="md:w-16 rotate-90" />
                            <div className="flex items-center flex-col gap-1">
                                <FiNavigation className="md:text-xl text-base" />
                                <p>{data?.wind?.speed}m/s {data?.wind?.deg} Degree</p>
                            </div>
                            <hr className="md:w-16 rotate-90" />
                            <div className="flex flex-col gap-1">
                                <p>
                                    Sunrise: {data?.sys?.sunrise !== undefined && data?.timezone !== undefined
                                        ? new Date(
                                            (data.sys.sunrise + data.timezone) * 1000
                                        ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
                                        : 'N/A'}
                                </p>
                                <p>
                                    Sunset: {data?.sys?.sunset !== undefined && data?.timezone !== undefined
                                        ? new Date(
                                            (data.sys.sunset + data.timezone) * 1000
                                        ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default WeatherCard;

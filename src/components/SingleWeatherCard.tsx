import { useEffect, useState } from "react";
import { FiNavigation } from "react-icons/fi";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { fetchData } from "../utils/fetchData";
import { capitalizeWords } from "../utils/capitalizeWords";
import { getLocalTimeForTimezone } from "../utils/formatedDateTime";
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

const SingleWeatherCard = ({ cityCode }: props) => {
    const [data, setData] = useState<WeatherData>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(cityCode, setData, setLoading);
    }, [cityCode])

    const handleBack = () => {
        navigate(-1);
    }
    return (
        <>
            {loading ?
                <Loading />
                :
                <div className="w-4xl">
                    <div
                        className="bg-[#388de7] p-4 rounded-t-lg text-white  mx-auto bg-cover bg-no-repeat"
                    >
                        <div className="relative text-white text-2xl">
                            <LiaArrowLeftSolid className="text-right hover:text-blue-800 hover:font-bold hover:cursor-pointer"
                                onClick={() => handleBack()}
                            />
                        </div>

                        <div className="flex flex-col justify-between items-center">
                            <div className="text-center py-4">
                                <h2 className="text-3xl font-semibold">{data?.name}, {data?.sys?.country}</h2>
                                {data?.timezone !== undefined ? (
                                    <>
                                        {getLocalTimeForTimezone(data.timezone).toLocaleTimeString([], {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true
                                        })}, {" "}
                                        {getLocalTimeForTimezone(data.timezone).toLocaleDateString([], {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </>
                                ) : (
                                    'N/A'
                                )}
                            </div>
                            <div className="flex justify-center items-center py-8">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`}
                                        alt={data?.weather?.[0]?.description}
                                        className="w-18"
                                    />
                                    <p className="text-xl">{capitalizeWords(data?.weather?.[0]?.description ?? '')}</p>

                                </div>
                                <hr className="w-24 rotate-90" />
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <p className="text-5xl">{(data?.main?.temp?.toFixed(1))}°C</p>
                                    <div>
                                        <p>Temp Min: {(data?.main?.temp_min?.toFixed(1))}°C</p>
                                        <p>Temp Max: {(data?.main?.temp_max?.toFixed(1))}°C</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#383b47] w-full py-10 px-36 rounded-b-lg text-white flex justify-between text-base items-center">
                        <div className="flex justify-left flex-col gap-1">
                            <p>Pressure: {data?.main?.pressure}hPa</p>
                            <p>Humidity: {data?.main?.humidity}%</p>
                            <p>Visibility: {data?.visibility !== undefined ? (data.visibility / 1000).toFixed(1) + 'km' : 'N/A'}</p>
                        </div>
                        <hr className="w-16 rotate-90" />
                        <div className="flex items-center flex-col gap-1">
                            <FiNavigation className="text-xl" />
                            <p>{data?.wind?.speed}m/s {data?.wind?.deg} Degree</p>
                        </div>
                        <hr className="w-16 rotate-90" />
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
            }
        </>
    );
};

export default SingleWeatherCard;

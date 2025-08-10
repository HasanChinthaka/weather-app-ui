import { CiCloudOn } from "react-icons/ci";
import { FiNavigation } from "react-icons/fi";

const WeatherCard = () => {
    return (
        <div className="w-xl">
            <div
                className="bg-[#388ee7] pt-12 pb-10 px-18 rounded-t-lg text-white  mx-auto bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/src/assets/weather-card-bg.png')" }}
            >
                <div className="flex justify-between items-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">Colombo, LK</h2>
                        <p className="text-base">9:19 AM, Feb 8</p>
                    </div>
                    <p className="text-6xl font-semibold">27°C</p>

                </div>

                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-2 ms-6">
                        <CiCloudOn className="text-2xl"/>
                        <p className="text-xl">Few Clouds</p>
                    </div>
                    <div className="text-center">
                        <p>Temp Min: 25°C</p>
                        <p>Temp Max: 28°C</p>
                    </div>
                </div>
            </div>
            <div className="bg-[#383b47] py-10 px-9 rounded-b-lg text-white flex justify-between text-base items-center">
                <div className="flex justify-left flex-col gap-1">
                    <p>Pressure: 1018hPa</p>
                    <p>Humidity: 78%</p>
                    <p>Visibility: 8.0km</p>
                </div>
                <hr className="w-16 rotate-90" />
                <div className="flex items-center flex-col gap-1">
                    <FiNavigation className="text-xl" />
                    <p>4.0m/s 120 Degree</p>
                </div>
                <hr className="w-16 rotate-90" />
                <div className="flex flex-col gap-1">
                    <p>Sunrise: 6:05am</p>
                    <p>Sunset: 6:05am</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

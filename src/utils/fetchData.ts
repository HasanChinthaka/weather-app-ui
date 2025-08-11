export const fetchData = async (cityCode: string, setData: (data: any) => void) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/weather?id=${cityCode}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const res_data = await res.json();
    setData(res_data);
  } catch (error: any) {
    console.log('error', error);
  }
};

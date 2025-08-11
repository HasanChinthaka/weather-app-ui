type CacheEntry = {
  data: any;
  expiry: number;
};

const cache: Record<string, CacheEntry> = {};

export const fetchData = async (
  cityCode: string,
  setData: (data: any) => void,
  setLoading: (loading: boolean) => void
) => {
  const cacheKey = cityCode;
  const now = Date.now();

  // Check if we have valid cached data
  if (cache[cacheKey] && cache[cacheKey].expiry > now) {
    setData(cache[cacheKey].data);
    return; // serve cached data
  }

  try {
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/weather?id=${cityCode}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const res_data = await res.json();
    setData(res_data);

    // Cache the response with 5 minutes expiry
    cache[cacheKey] = {
      data: res_data,
      expiry: now + 5 * 60 * 1000, // 5 minutes in milliseconds
    };
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

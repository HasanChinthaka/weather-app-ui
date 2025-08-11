import cities from "../config/cities.json";

type props = {
  CityCode: string;
  CityName: string;
  Temp: string;
  Status: string;
};
export function extractCityCode(): string[] {
  // 'cities' is the imported JSON array
  return cities.List.map((city: props) => city.CityCode);
}

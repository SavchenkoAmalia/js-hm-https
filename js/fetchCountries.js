export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const params = '?fields=name,capital,population,flags,languages';

  return fetch(`${BASE_URL}${name}${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
}

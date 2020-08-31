import queryString from 'query-string';
import axios, { getAuthConfig } from './baseAxios';

export const getCovidData = async ({ countryCode, from, to }) => {
  const qs = queryString.stringify({
    from,
    to,
  });

  const response = await axios.get(
    `/analytics/get-covid-data/${countryCode}?${qs}`,
    getAuthConfig()
  );
  return response;
};

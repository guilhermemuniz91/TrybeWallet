// Coloque aqui suas actions

export const SET_EMAIL = 'SET_EMAIL';

export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});

export const FETCH_CURRENCIES = (currency) => ({
  type: 'FETCH_CURRENCIES',
  payload: currency,
});

export const currenciesApiResponse = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  delete data.USDT;
  const result = Object.keys(data);
  return result;
};

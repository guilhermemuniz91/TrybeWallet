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
  // const result = data;
  return result;
};

export const currenciesQuotation = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  delete data.USDT;
  return data;
};

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses: {
    id: expenses.id,
    value: expenses.value,
    description: expenses.description,
    currency: expenses.currency,
    method: expenses.method,
    tag: expenses.tag,
    exchangeRates: expenses.exchangeRates,
  },
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteExpense = (payload) => (
  { type: DELETE_EXPENSE, payload }
);

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editExpense = (payload) => (
  { type: EDIT_EXPENSE, payload }
);

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const updateExpenses = (payload) => (
  { type: UPDATE_EXPENSES, payload }
);

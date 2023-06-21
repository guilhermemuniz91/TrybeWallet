// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

// import { ADD_EXPENSES, FETCH_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses,
        {
          value: action.expenses.value,
          currency: action.expenses.currency,
          method: action.expenses.method,
          tag: action.expenses.tag,
          description: action.expenses.description,
          id: state.expenses.length,
          exchangeRates: action.expenses.exchangeRates,
        }],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((oneExpense) => oneExpense.id !== action.payload),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      expenses: state.expenses.map((expense) => (expense.id === action.payload.id
        ? { ...expense, ...action.payload }
        : expense)),
      editor: false,
    };

  default:
    return state;
  }
};

export default walletReducer;

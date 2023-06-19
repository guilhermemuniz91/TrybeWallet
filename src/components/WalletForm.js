import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_CURRENCIES,
  currenciesApiResponse,
  addExpenses,
  currenciesQuotation } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    this.dispatchCurrency();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  dispatchCurrency = async () => {
    const { dispatch } = this.props;
    const currencyList = await currenciesApiResponse();
    dispatch(FETCH_CURRENCIES(currencyList));
    return currencyList;
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const exchangeRates = await currenciesQuotation();
    const { value, description, currency, method, tag, id } = this.state;
    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(addExpenses(expenses));
    this.setState({ // Limpa os inputs e reseta o estado
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies,
    } = this.props;

    return (
      <main>

        <form action="">

          <label htmlFor="valueInput">
            Valor da despesa:
            <input
              type="text"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ (event) => this.handleChange(event) } // refatorar
              id="valueInput"
            />
          </label>

          <label htmlFor="descriptionInput">
            Descrição da despesa:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ (event) => this.handleChange(event) } // refatorar
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.handleChange(event) } // refatorar
            >
              {currencies.map((oneCurrency) => (
                <option
                  key={ oneCurrency }
                  value={ oneCurrency }
                >
                  {oneCurrency}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ (event) => this.handleChange(event) } // refatorar
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tagInput">
            Categoria de despesa:
            <select
              name="tag"
              id="tagInput"
              data-testid="tag-input"
              value={ tag }
              onChange={ (event) => this.handleChange(event) } // refatorar
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

        </form>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>

      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);

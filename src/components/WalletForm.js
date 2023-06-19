import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FETCH_CURRENCIES, currenciesApiResponse } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.dispatchCurrency();
  }

  dispatchCurrency = async () => {
    const { dispatch } = this.props;
    const currencyList = await currenciesApiResponse();
    dispatch(FETCH_CURRENCIES(currencyList));
    return currencyList;
  };

  render() {
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
              id="valueInput"
            />
          </label>

          <label htmlFor="descriptionInput">
            Descrição da despesa:
            <input
              type="text"
              data-testid="description-input"
              name="description"
            />
          </label>

          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
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

            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

        </form>

      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);

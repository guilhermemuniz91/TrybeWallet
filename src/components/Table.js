import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((oneExpense) => (
            <tr key={ oneExpense.id }>
              <td>{oneExpense.description}</td>
              <td>{oneExpense.tag}</td>
              <td>{oneExpense.method}</td>
              <td>{Number(oneExpense.value).toFixed(2)}</td>
              <td>{oneExpense.exchangeRates[oneExpense.currency].name}</td>
              <td>
                {Number(oneExpense.exchangeRates[oneExpense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                {Number(oneExpense.value * oneExpense.exchangeRates[oneExpense.currency]
                  .ask).toFixed(2)}
              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

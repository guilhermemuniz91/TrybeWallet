import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  expensesSum = () => {
    const { expenses } = this.props;
    let sum = 0;

    expenses.forEach((oneExpense) => {
      const { value, currency, exchangeRates } = oneExpense;
      sum += value * exchangeRates[currency].ask;
    });

    return parseFloat(sum).toFixed(2);
  };

  render() {
    const { email } = this.props;
    const totalExpenses = this.expensesSum();
    return (
      <header>

        <h3 data-testid="email-field">
          Usuário:
          {email}
        </h3>

        <p data-testid="total-field">
          {totalExpenses
            ? `Total de despesas: ${totalExpenses} BRL` : 'Total de despesas: 0'}
        </p>

        <p data-testid="header-currency-field">BRL</p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);

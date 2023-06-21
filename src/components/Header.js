import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenses = (expenses) => {
    let sum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      const { ask } = exchangeRates[currency];
      sum += value * ask;
    });
    return sum.toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header>

        <h3 data-testid="email-field">
          Usuário:
          {email}
        </h3>

        <p data-testid="total-field">
          { this.totalExpenses(expenses) }
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

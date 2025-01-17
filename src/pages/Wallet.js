import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Header />
          <WalletForm />
        </main>
        <Table />
      </div>
    );
  }
}

export default Wallet;

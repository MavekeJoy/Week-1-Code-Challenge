import React, { useState, useEffect } from 'react';
import TransactionsList from './TransactionsList';
import AddTransactionForm from './AddTransactionForm';

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
      const addedTransaction = await response.json();
      setTransactions([...transactions, addedTransaction]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList transactions={transactions} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
    </div>
  );
}

export default AccountContainer;
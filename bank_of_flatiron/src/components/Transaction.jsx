import React from 'react';

const Transaction = ({ transaction }) => (
  <tr>
    <td>{transaction.id}</td>
    <td>{transaction.description}</td>
    <td>{transaction.amount}</td>
  </tr>
);

export default Transaction;
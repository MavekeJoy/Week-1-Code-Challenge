import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const AddTransactionForm = ({ onAddTransaction }) => {
  return (
    <div className="ui segment">
      <Formik
        initialValues={{ date: '', description: '', category: '', amount: '' }}
        validationSchema={Yup.object({
          date: Yup.date().required('Required'),
          description: Yup.string().required('Required'),
          category: Yup.string().required('Required'),
          amount: Yup.number().required('Required').positive('Must be a positive number'),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await fetch('http://localhost:3000/transactions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });
            const newTransaction = await response.json();
            onAddTransaction(newTransaction);
            resetForm();
          } catch (error) {
            console.error('Error adding transaction:', error);
          }
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="ui form">
            <div className="inline fields">
              <div className="field">
                <label>Date</label>
                <Field type="date" name="date" />
              </div>
              <div className="field">
                <label>Description</label>
                <Field type="text" name="description" placeholder="Description" />
              </div>
              <div className="field">
                <label>Category</label>
                <Field type="text" name="category" placeholder="Category" />
              </div>
              <div className="field">
                <label>Amount</label>
                <Field type="number" name="amount" placeholder="Amount" step="0.01" />
              </div>
            </div>
            <button className="ui button" type="submit" name="submit" disabled={!(isValid && dirty)}>Add Transaction</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTransactionForm;
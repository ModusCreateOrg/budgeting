import React from 'react';
import { mount } from 'enzyme';
import { EntryFormRow } from '../index';

// Mock default categories
const mockCategories = {
  1: 'Groceries',
  2: 'Income',
};

// Mock prop function
const setEditTransactionMock = jest.fn();

// Mock action creators
const addTransactionMock = jest.fn();
const updateTransactionMock = jest.fn();
const deleteTransactionMock = jest.fn();

describe('`Add transaction` form', () => {
  const newTransaction = {
    id: '',
    description: 'Income line item',
    value: 123.45,
    categoryId: 2,
  };

  const propsAndActions = {
    defaultCategoryId: 1,
    transaction: newTransaction,
    categories: mockCategories,
    setEditTransaction: setEditTransactionMock,
    // Actions
    addTransaction: addTransactionMock,
    updateTransaction: updateTransactionMock,
    deleteTransaction: deleteTransactionMock,
  };

  const wrappedComponent = mount(
    <table>
      <tbody>
        <EntryFormRow {...propsAndActions} />
      </tbody>
    </table>
  );
  const mountedComponent = wrappedComponent.find(EntryFormRow);

  const addTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'addTransaction');
  const updateTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'updateTransaction');
  const deleteTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'deleteTransaction');
  const setEditTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'setEditTransaction');

  afterEach(() => {
    addTransactionSpy.mockReset();
    updateTransactionSpy.mockReset();
    deleteTransactionSpy.mockReset();
    setEditTransactionSpy.mockReset();
  });

  describe('Submit button', () => {
    it('should exist with text Add', () => {
      const submitButton = mountedComponent.find('button.submit');
      expect(submitButton.length).toEqual(1);
      expect(submitButton.text()).toEqual('Add');
    });

    it('should call handleSubmit when clicked', () => {
      const form = mountedComponent.find('form');
      form.simulate('submit');
      expect(addTransactionSpy).toHaveBeenCalled();
      expect(setEditTransactionSpy).not.toHaveBeenCalled();
      expect(updateTransactionSpy).not.toHaveBeenCalled();
    });
  });

  describe('Cancel button', () => {
    it('should not exist', () => {
      const cancelButton = mountedComponent.find('button.cancel');
      expect(cancelButton.length).toEqual(0);
    });
  });

  describe('Delete button', () => {
    it('should not exist', () => {
      const deleteButton = mountedComponent.find('button.delete');
      expect(deleteButton.length).toEqual(0);
    });
  });
});

describe('`Update transaction` form', () => {
  const existingTransaction = {
    id: 1,
    description: 'Income line item',
    value: 234.56,
    categoryId: 2,
  };

  const propsAndActions = {
    defaultCategoryId: 1,
    transaction: existingTransaction,
    categories: mockCategories,
    setEditTransaction: setEditTransactionMock,
    // Actions
    addTransaction: addTransactionMock,
    updateTransaction: updateTransactionMock,
    deleteTransaction: deleteTransactionMock,
  };

  const wrappedComponent = mount(
    <table>
      <tbody>
        <EntryFormRow {...propsAndActions} />
      </tbody>
    </table>
  );
  const mountedComponent = wrappedComponent.find(EntryFormRow);

  const addTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'addTransaction');
  const updateTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'updateTransaction');
  const deleteTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'deleteTransaction');
  const setEditTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'setEditTransaction');

  afterEach(() => {
    addTransactionSpy.mockReset();
    updateTransactionSpy.mockReset();
    deleteTransactionSpy.mockReset();
    setEditTransactionSpy.mockReset();
  });

  describe('Submit button', () => {
    it('should exist with text Update', () => {
      const submitButton = mountedComponent.find('button.submit');
      expect(submitButton.length).toEqual(1);
      expect(submitButton.text()).toEqual('Update');
    });

    it('should call handleSubmit when clicked', async () => {
      const form = mountedComponent.find('form');
      form.simulate('submit');
      expect(updateTransactionSpy).toHaveBeenCalled();
      expect(setEditTransactionSpy).toHaveBeenCalled();
      expect(addTransactionSpy).not.toHaveBeenCalled();
    });
  });

  describe('Cancel button', () => {
    const cancelButton = mountedComponent.find('button.cancel');

    it('should exist', () => {
      expect(cancelButton.length).toEqual(1);
    });

    it('should call setEditTransaction when clicked', async () => {
      cancelButton.simulate('click');
      expect(setEditTransactionSpy).toHaveBeenCalled();
      expect(setEditTransactionSpy).toHaveBeenCalledWith('');
    });
  });

  describe('Delete button', () => {
    const deleteButton = mountedComponent.find('button.delete');

    it('should exist', () => {
      expect(deleteButton.length).toEqual(1);
    });

    it('should call handleDelete when clicked', async () => {
      deleteButton.simulate('click');
      expect(deleteTransactionSpy).toHaveBeenCalled();
      expect(deleteTransactionSpy).toHaveBeenCalledWith(existingTransaction.id);
      expect(setEditTransactionSpy).toHaveBeenCalled();
    });
  });
});

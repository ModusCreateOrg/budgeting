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

let addTransactionSpy;
let updateTransactionSpy;
let deleteTransactionSpy;
let setEditTransactionSpy;

function resetMockSpies(spies) {
  spies.forEach(spy => spy.mockReset());
}

function setUpSpies(mountedComponent) {
  addTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'addTransaction');
  updateTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'updateTransaction');
  deleteTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'deleteTransaction');
  setEditTransactionSpy = jest.spyOn(mountedComponent.instance().props, 'setEditTransaction');
}

describe('`Add transaction` form', () => {
  const wrappedComponent = mount(
    <table>
      <tbody>
        <EntryFormRow
          defaultCategoryId={1}
          transaction={{
            id: '',
            description: 'Income line item',
            value: 123.45,
            categoryId: 2,
          }}
          categories={mockCategories}
          setEditTransaction={setEditTransactionMock}
          // Actions
          addTransaction={addTransactionMock}
          updateTransaction={updateTransactionMock}
          deleteTransaction={deleteTransactionMock}
        />
      </tbody>
    </table>
  );
  const mountedComponent = wrappedComponent.find(EntryFormRow);

  setUpSpies(mountedComponent);

  afterEach(() =>
    resetMockSpies([addTransactionSpy, updateTransactionSpy, deleteTransactionSpy, setEditTransactionSpy]));

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
      expect(addTransactionSpy).toHaveBeenCalledWith({
        description: 'Income line item',
        value: 123.45,
        categoryId: 2,
      });
      expect(setEditTransactionSpy).not.toHaveBeenCalled();
      expect(updateTransactionSpy).not.toHaveBeenCalled();
    });
  });

  describe('Cancel and Delete buttons', () => {
    it('should not exist', () => {
      expect(mountedComponent.find('button.cancel').length).toEqual(0);
      expect(mountedComponent.find('button.delete').length).toEqual(0);
    });
  });
});

describe('`Update transaction` form', () => {
  const updatedTransaction = {
    id: 1,
    description: 'Income line item',
    value: 234.56,
    categoryId: 2,
  };

  const wrappedComponent = mount(
    <table>
      <tbody>
        <EntryFormRow
          defaultCategoryId={1}
          transaction={updatedTransaction}
          categories={mockCategories}
          setEditTransaction={setEditTransactionMock}
          // Actions
          addTransaction={addTransactionMock}
          updateTransaction={updateTransactionMock}
          deleteTransaction={deleteTransactionMock}
        />
      </tbody>
    </table>
  );
  const mountedComponent = wrappedComponent.find(EntryFormRow);

  setUpSpies(mountedComponent);

  afterEach(() =>
    resetMockSpies([addTransactionSpy, updateTransactionSpy, deleteTransactionSpy, setEditTransactionSpy]));

  describe('Submit button', () => {
    it('should exist with text Update', () => {
      expect(mountedComponent.find('button.submit').length).toEqual(1);
      expect(mountedComponent.find('button.submit').text()).toEqual('Update');
    });

    it('should call handleSubmit when clicked', async () => {
      const form = mountedComponent.find('form');
      form.simulate('submit');
      expect(updateTransactionSpy).toHaveBeenCalled();
      expect(updateTransactionSpy).toHaveBeenCalledWith(updatedTransaction);
      expect(setEditTransactionSpy).toHaveBeenCalled();
      expect(setEditTransactionSpy).toHaveBeenCalledWith('');
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
    it('should exist', () => {
      expect(mountedComponent.find('button.delete').length).toEqual(1);
    });

    it('should call handleDelete when clicked', async () => {
      mountedComponent.find('button.delete').simulate('click');
      expect(deleteTransactionSpy).toHaveBeenCalled();
      expect(deleteTransactionSpy).toHaveBeenCalledWith(1);
      expect(setEditTransactionSpy).toHaveBeenCalled();
      expect(setEditTransactionSpy).toHaveBeenCalledWith('');
    });
  });
});

import {
  sortTransactions,
  getTransactions,
  getInflowBalance,
  getOutflowBalance,
  getFormattedBalance,
  getFormattedInflowBalance,
  getFormattedOutflowBalance,
  getOutflowByCategoryName,
  getInflowByCategoryName,
  getTransaction,
  getFlowShareForTransaction,
  getFlowShareForTransactionFormatted,
  getFlowShareForTransactionMapped,
} from '../transactions';

// Mock 'selectors/categories' dependency
jest.mock('../categories', () => {
  const categoriesMock = {
    1: 'Groceries',
    2: 'School',
    3: 'Entertainment',
    4: 'DefaultCategory',
  };

  return {
    getCategories: () => categoriesMock,
    getDefaultCategoryId: () => '4',
  };
});

describe('sortTransactions', () => {
  it('should return transactions sorted descending by value', () => {
    const state = [{ value: 10 }, { value: -50 }, { value: 70 }];
    const expectedSelection = [{ value: 70 }, { value: 10 }, { value: -50 }];

    expect(sortTransactions(state)).toEqual(expectedSelection);
  });
});

describe('getTransactions', () => {
  it('should return all transactions in the state', () => {
    const state = { transactions: [{ id: 1 }, { id: 2 }] };
    const expectedSelection = [{ id: 1 }, { id: 2 }];

    expect(getTransactions(state)).toEqual(expectedSelection);
  });

  it('should return empty array if the state has no transactions', () => {
    const state = {};
    const expectedSelection = [];

    expect(getTransactions(state)).toEqual(expectedSelection);
  });
});

describe('getInflowBalance', () => {
  it('should return the sum of values of every transactions with positive value', () => {
    const state = { transactions: [{ value: 10 }, { value: -50 }, { value: 70 }] };
    const expectedSelection = 80;

    expect(getInflowBalance(state)).toEqual(expectedSelection);
  });

  it('should return 0 if there are no transactions with positive value', () => {
    const state = { transactions: [{ value: -50 }] };
    const expectedSelection = 0;

    expect(getInflowBalance(state)).toEqual(expectedSelection);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getInflowBalance.resetRecomputations();

    const state1 = { transactions: [{ value: 10 }, { value: -50 }, { value: 70 }] };
    const state2 = { transactions: state1.transactions };
    const expectedSelection1 = 80;

    const state3 = { transactions: [{ value: 10 }] };
    const expectedSelection2 = 10;

    expect(getInflowBalance(state1)).toEqual(expectedSelection1);
    expect(getInflowBalance(state2)).toEqual(expectedSelection1);
    expect(getInflowBalance.recomputations()).toEqual(1);
    expect(getInflowBalance(state3)).toEqual(expectedSelection2);
    expect(getInflowBalance.recomputations()).toEqual(2);
  });
});

describe('getOutflowBalance', () => {
  it('should return the sum of values of every transactions with negative value', () => {
    const state = { transactions: [{ value: -10 }, { value: -50 }, { value: 70 }] };
    const expectedSelection = -60;

    expect(getOutflowBalance(state)).toEqual(expectedSelection);
  });

  it('should return 0 if there are no transactions with negative value', () => {
    const state = { transactions: [{ value: 50 }] };
    const expectedSelection = 0;

    expect(getOutflowBalance(state)).toEqual(expectedSelection);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getOutflowBalance.resetRecomputations();

    const state1 = { transactions: [{ value: -10 }, { value: -50 }, { value: 70 }] };
    const state2 = { transactions: state1.transactions };
    const expectedSelection1 = -60;

    const state3 = { transactions: [{ value: -10 }] };
    const expectedSelection2 = -10;

    expect(getOutflowBalance(state1)).toEqual(expectedSelection1);
    expect(getOutflowBalance(state2)).toEqual(expectedSelection1);
    expect(getOutflowBalance.recomputations()).toEqual(1);
    expect(getOutflowBalance(state3)).toEqual(expectedSelection2);
    expect(getOutflowBalance.recomputations()).toEqual(2);
  });
});

describe('getFormattedBalance', () => {
  it('should return formatted object of the sum of values of every transactions', () => {
    const state = { transactions: [{ value: 10 }, { value: -50 }, { value: 70 }] };
    const expectedSelection = {
      text: '$30.00',
      isNegative: false,
    };

    expect(getFormattedBalance(state)).toEqual(expectedSelection);
  });

  it('should return formatted object when the balance is negative', () => {
    const state = { transactions: [{ value: -10 }, { value: -50 }] };
    const expectedSelection = {
      text: '$60.00',
      isNegative: true,
    };

    expect(getFormattedBalance(state)).toEqual(expectedSelection);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getFormattedBalance.resetRecomputations();

    const state1 = { transactions: [{ value: 10 }, { value: -50 }, { value: 70 }] };
    const state2 = { transactions: state1.transactions };
    const expectedSelection1 = {
      text: '$30.00',
      isNegative: false,
    };

    const state3 = { transactions: [{ value: 0 }] };
    const expectedSelection2 = {
      text: '$0.00',
      isNegative: false,
    };

    expect(getFormattedBalance(state1)).toEqual(expectedSelection1);
    expect(getFormattedBalance(state2)).toEqual(expectedSelection1);
    expect(getFormattedBalance.recomputations()).toEqual(1);
    expect(getFormattedBalance(state3)).toEqual(expectedSelection2);
    expect(getFormattedBalance.recomputations()).toEqual(2);
  });
});

describe('getFormattedInflowBalance', () => {
  it('should return formatted object of the sum of values of every positive transactions', () => {
    const state = { transactions: [{ value: 10 }, { value: -50 }, { value: 70 }] };
    const expectedSelection = {
      text: '$80.00',
      isNegative: false,
    };

    expect(getFormattedInflowBalance(state)).toEqual(expectedSelection);
  });

  it('should return formatted object when the balance is 0', () => {
    const state = { transactions: [{ value: -10 }, { value: -50 }] };
    const expectedSelection = {
      text: '$0.00',
      isNegative: false,
    };

    expect(getFormattedInflowBalance(state)).toEqual(expectedSelection);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getFormattedInflowBalance.resetRecomputations();

    const state1 = { transactions: [{ value: 10 }, { value: -50 }, { value: 70 }] };
    const state2 = { transactions: state1.transactions };
    const expectedSelection1 = {
      text: '$80.00',
      isNegative: false,
    };

    const state3 = { transactions: [{ value: 0 }] };
    const expectedSelection2 = {
      text: '$0.00',
      isNegative: false,
    };

    expect(getFormattedInflowBalance(state1)).toEqual(expectedSelection1);
    expect(getFormattedInflowBalance(state2)).toEqual(expectedSelection1);
    expect(getFormattedInflowBalance.recomputations()).toEqual(1);
    expect(getFormattedInflowBalance(state3)).toEqual(expectedSelection2);
    expect(getFormattedInflowBalance.recomputations()).toEqual(2);
  });
});

describe('getFormattedOutflowBalance', () => {
  it('should return formatted object of the sum of values of every negative transactions', () => {
    const state = { transactions: [{ value: -10 }, { value: 50 }, { value: -70 }] };
    const expectedSelection = {
      text: '$80.00',
      isNegative: true,
    };

    expect(getFormattedOutflowBalance(state)).toEqual(expectedSelection);
  });

  it('should return formatted object when the balance is 0', () => {
    const state = { transactions: [{ value: 10 }, { value: 50 }] };
    const expectedSelection = {
      text: '$0.00',
      isNegative: false,
    };

    expect(getFormattedOutflowBalance(state)).toEqual(expectedSelection);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getFormattedOutflowBalance.resetRecomputations();

    const state1 = { transactions: [{ value: -10 }, { value: 50 }, { value: -70 }] };
    const state2 = { transactions: state1.transactions };
    const expectedSelection1 = {
      text: '$80.00',
      isNegative: true,
    };

    const state3 = { transactions: [{ value: 0 }] };
    const expectedSelection2 = {
      text: '$0.00',
      isNegative: false,
    };

    expect(getFormattedOutflowBalance(state1)).toEqual(expectedSelection1);
    expect(getFormattedOutflowBalance(state2)).toEqual(expectedSelection1);
    expect(getFormattedOutflowBalance.recomputations()).toEqual(1);
    expect(getFormattedOutflowBalance(state3)).toEqual(expectedSelection2);
    expect(getFormattedOutflowBalance.recomputations()).toEqual(2);
  });
});

describe('getOutflowByCategoryName', () => {
  it('should return category objects for every transactions with negative value', () => {
    const state = {
      transactions: [
        { value: -10, categoryId: 1 },
        { value: -50, categoryId: 1 },
        { value: 70, categoryId: 2 },
        { value: -30, categoryId: 2 },
      ],
    };
    const expectedSelection = [
      { value: 60, categoryId: 1, category: 'Groceries' },
      { value: 30, categoryId: 2, category: 'School' },
    ];

    expect(getOutflowByCategoryName(state)).toEqual(expectedSelection);
  });

  it('should return an empty array if no category applies', () => {
    const state = {
      transactions: [
        { value: 10, categoryId: 1 },
        { value: 50, categoryId: 1 },
        { value: 70, categoryId: 2 },
        { value: 30, categoryId: 2 },
      ],
    };
    const expectedSelection = [];

    expect(getOutflowByCategoryName(state)).toEqual(expectedSelection);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getOutflowByCategoryName.resetRecomputations();

    const state1 = {
      transactions: [
        { value: -10, categoryId: 1 },
        { value: -50, categoryId: 1 },
        { value: 70, categoryId: 2 },
        { value: -30, categoryId: 2 },
      ],
    };
    const state2 = { transactions: state1.transactions };
    const expectedSelection1 = [
      { value: 60, categoryId: 1, category: 'Groceries' },
      { value: 30, categoryId: 2, category: 'School' },
    ];

    const state3 = { transactions: [{ value: 0 }] };
    const expectedSelection2 = [];

    expect(getOutflowByCategoryName(state1)).toEqual(expectedSelection1);
    expect(getOutflowByCategoryName.recomputations()).toEqual(1);
    expect(getOutflowByCategoryName(state2)).toEqual(expectedSelection1);
    expect(getOutflowByCategoryName.recomputations()).toEqual(1);
    expect(getOutflowByCategoryName(state3)).toEqual(expectedSelection2);
    expect(getOutflowByCategoryName.recomputations()).toEqual(2);
  });
});

describe('getInflowByCategoryName', () => {
  it('should return category objects for every transactions with positive value', () => {
    const state = {
      transactions: [
        { value: 10, categoryId: 1 },
        { value: 50, categoryId: 1 },
        { value: -70, categoryId: 2 },
        { value: 30, categoryId: 2 },
      ],
    };
    const expectedSelection = [
      { value: 60, categoryId: 1, category: 'Groceries' },
      { value: 30, categoryId: 2, category: 'School' },
    ];

    expect(getInflowByCategoryName(state)).toEqual(expectedSelection);
  });

  it('should return an empty array if no category applies', () => {
    const state = {
      transactions: [
        { value: -10, categoryId: 1 },
        { value: -50, categoryId: 1 },
        { value: -70, categoryId: 2 },
        { value: -30, categoryId: 2 },
      ],
    };
    const expectedSelection = [];

    expect(getInflowByCategoryName(state)).toEqual(expectedSelection);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getInflowByCategoryName.resetRecomputations();

    const state1 = {
      transactions: [
        { value: 10, categoryId: 1 },
        { value: 50, categoryId: 1 },
        { value: -70, categoryId: 2 },
        { value: 30, categoryId: 2 },
      ],
    };
    const state2 = { transactions: state1.transactions };
    const expectedSelection1 = [
      { value: 60, categoryId: 1, category: 'Groceries' },
      { value: 30, categoryId: 2, category: 'School' },
    ];

    const state3 = { transactions: [{ value: 0 }] };
    const expectedSelection2 = [];

    expect(getInflowByCategoryName(state1)).toEqual(expectedSelection1);
    expect(getInflowByCategoryName.recomputations()).toEqual(1);
    expect(getInflowByCategoryName(state2)).toEqual(expectedSelection1);
    expect(getInflowByCategoryName.recomputations()).toEqual(1);
    expect(getInflowByCategoryName(state3)).toEqual(expectedSelection2);
    expect(getInflowByCategoryName.recomputations()).toEqual(2);
  });
});

describe('getTransaction', () => {
  it('should return transaction by match params', () => {
    getTransaction.resetRecomputations();

    const state1 = {
      transactions: [{ value: 10, id: 1 }, { value: -70, id: 2 }],
    };
    const props = {
      match: { params: { id: 1 } },
    };

    const expectedSelection1 = { value: 10, id: 1 };

    expect(getTransaction(state1, props)).toEqual(expectedSelection1);
  });

  it('should return transaction if by transaction.id', () => {
    getTransaction.resetRecomputations();

    const state1 = {
      transactions: [{ value: 10, id: 1 }, { value: -70, id: 2 }],
    };
    const props = {
      transaction: { id: 1, value: 10 },
    };

    const expectedSelection1 = { value: 10, id: 1 };

    expect(getTransaction(state1, props)).toEqual(expectedSelection1);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getTransaction.resetRecomputations();

    const state1 = {
      transactions: [{ value: 10, id: 1 }, { value: -70, id: 2 }],
    };
    const state2 = { transactions: state1.transactions };
    const props = {
      match: { params: { id: 1 } },
    };

    const state3 = {
      transactions: [{ value: 20, id: 1 }],
    };

    const expectedSelection1 = { value: 10, id: 1 };
    const expectedSelection2 = { value: 20, id: 1 };

    expect(getTransaction(state1, props)).toEqual(expectedSelection1);
    expect(getTransaction.recomputations()).toEqual(1);
    expect(getTransaction(state2, props)).toEqual(expectedSelection1);
    expect(getTransaction.recomputations()).toEqual(1);
    expect(getTransaction(state3, props)).toEqual(expectedSelection2);
    expect(getTransaction.recomputations()).toEqual(2);
  });
});

describe('getFlowShareForTransaction', () => {
  it('should return percentage of transaction outflow', () => {
    getFlowShareForTransaction.resetRecomputations();

    const state1 = {
      transactions: [
        { value: -10, id: 1, categoryId: 1 },
        { value: -10, id: 2, categoryId: 1 },
        { value: -10, id: 3, categoryId: 1 },
        { value: -10, id: 4, categoryId: 1 },
        { value: 10, id: 5, categoryId: 15 },
      ],
    };
    const props = {
      match: { params: { id: 1 } },
    };

    const expectedSelection1 = { flowTotal: -40, percent: 0.25 };

    expect(getFlowShareForTransaction(state1, props)).toEqual(expectedSelection1);
    expect(getFlowShareForTransaction.recomputations()).toEqual(1);
  });

  it('should return percentage of transaction inflow', () => {
    getFlowShareForTransaction.resetRecomputations();

    const state1 = {
      transactions: [
        { value: 10, id: 1, categoryId: 15 },
        { value: 10, id: 2, categoryId: 15 },
        { value: 10, id: 3, categoryId: 15 },
        { value: 10, id: 4, categoryId: 15 },
        { value: -10, id: 5, categoryId: 1 },
      ],
    };
    const props = {
      match: { params: { id: 1 } },
    };

    const expectedSelection1 = { flowTotal: 40, percent: 0.25 };

    expect(getFlowShareForTransaction(state1, props)).toEqual(expectedSelection1);
    expect(getFlowShareForTransaction.recomputations()).toEqual(1);
  });

  it('should not recompute if called twice with the same transactions in state', () => {
    getFlowShareForTransaction.resetRecomputations();

    const state1 = {
      transactions: [
        { value: 10, id: 1, categoryId: 15 },
        { value: 10, id: 2, categoryId: 15 },
        { value: 10, id: 3, categoryId: 15 },
        { value: 10, id: 4, categoryId: 15 },
        { value: -10, id: 5, categoryId: 1 },
      ],
    };
    const props = {
      match: { params: { id: 1 } },
    };

    const state2 = {
      transactions: state1.transactions,
    };

    const state3 = {
      transactions: [
        { value: 20, id: 1, categoryId: 15 },
        { value: 20, id: 2, categoryId: 15 },
        { value: 20, id: 3, categoryId: 15 },
        { value: 20, id: 4, categoryId: 15 },
      ],
    };

    const expectedSelection1 = { flowTotal: 40, percent: 0.25 };
    const expectedSelection2 = { flowTotal: 80, percent: 0.25 };

    expect(getFlowShareForTransaction(state1, props)).toEqual(expectedSelection1);
    expect(getFlowShareForTransaction.recomputations()).toEqual(1);
    expect(getFlowShareForTransaction(state2, props)).toEqual(expectedSelection1);
    expect(getFlowShareForTransaction.recomputations()).toEqual(1);
    expect(getFlowShareForTransaction(state3, props)).toEqual(expectedSelection2);
    expect(getFlowShareForTransaction.recomputations()).toEqual(2);
  });
});

describe('getFlowShareForTransactionFormatted', () => {
  it('should return formatted value', () => {
    const state1 = {
      transactions: [
        { value: -10, id: 1, categoryId: 1 },
        { value: -10, id: 2, categoryId: 1 },
        { value: -10, id: 3, categoryId: 1 },
        { value: -10, id: 4, categoryId: 1 },
        { value: 10, id: 5, categoryId: 15 },
      ],
    };
    const props = {
      match: { params: { id: 1 } },
    };

    const expectedSelection1 = '25.00%';

    expect(getFlowShareForTransactionFormatted(state1, props)).toEqual(expectedSelection1);
  });
});

describe('getFlowShareForTransactionFormatted', () => {
  it('should return mapped value', () => {
    const state1 = {
      transactions: [
        { value: -10, id: 1, description: 'desc', categoryId: 1 },
        { value: -10, id: 2, categoryId: 1 },
        { value: -10, id: 3, categoryId: 1 },
        { value: -10, id: 4, categoryId: 1 },
        { value: 10, id: 5, categoryId: 15 },
      ],
    };
    const props = {
      match: { params: { id: 1 } },
    };

    const expectedSelection1 = [
      {
        key: 0,
        label: 'desc',
        value: -10,
      },
      {
        key: 1,
        label: 'Rest',
        value: -30,
      },
    ];

    expect(getFlowShareForTransactionMapped(state1, props)).toEqual(expectedSelection1);
  });
});

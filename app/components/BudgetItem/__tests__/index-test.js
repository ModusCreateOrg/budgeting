import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetItem } from 'components/BudgetItem';

// mock nested components
jest.mock('react-router-dom');
jest.mock('components/DonutChart');

it('renders correctly', () => {
	const mockTransaction = {
		id: 1,
		description: "Trader Joe's food",
		value: -423.34,
		categoryId: 1
	};

	const mockCategories = {
		1: 'Groceries',
		2: 'School'
	};

	const tree = renderer
		.create(
			<BudgetItem
				inflow={6500}
				outflow={4500}
        transaction={mockTransaction}
				categories={mockCategories}
				budgetItemId={mockTransaction.id}
			/>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import { BudgetItemDetails } from 'components/BudgetItemDetails';
import { withRouter, MemoryRouter, location } from 'react-router';
import { mount } from 'enzyme';

const mockTransaction = {
    id: 1,
    description: "Trader Joe's food",
    value: -423.34,
    categoryId: 1,
};

const mockContribution = "20%"

const mockContributionMapped = [
    {
        key: 0,
        label: mockTransaction.description,
        value: mockTransaction.value
    },
    {
        key: 1,
        label: "rest",
        value: -500.00,
    }
]

jest.mock('components/DonutChart', () => 'div');

it("renders correctly", () => {
    const tree = renderer.create(<BudgetItemDetails
        transaction={mockTransaction}
        contribution={mockContribution}
        contributionMapped={mockContributionMapped} />).toJSON();
    expect(tree).toMatchSnapshot();
})
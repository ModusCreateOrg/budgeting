// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import formatAmount from 'utils/formatAmount';
import EntryFormRow from 'containers/EntryFormRow';
import Table from 'components/Table';
import type { Transaction } from 'modules/transactions';
import styles from './style.scss';

type ResponsiveCellProps = {
  columnName: string,
  value: React.Node,
  className?: string,
};

type BudgetGridProps = {
  transactions: Transaction[],
  categories: Object,
};

export class BudgetGrid extends React.Component<BudgetGridProps> {
  static defaultProps = {
    transactions: [],
    categories: {},
  };

  render() {
    const { transactions, categories } = this.props;

    const ResponsiveCell = ({ columnName, value, className }: ResponsiveCellProps) => (
      <div className={`${styles.responsiveCell} ${className || ''}`}>
        <div className={styles.cellLabel}>{columnName}</div>
        <div className={styles.cellContent}>{value}</div>
      </div>
    );

    const TableComponent = ({ children, ...otherProps }) => (
      <table {...otherProps}>
        {children}
        <tfoot>
          <EntryFormRow />
        </tfoot>
      </table>
    );

    const rows = transactions;

    const defaultColumn = {
      Cell: ({ column, value }) => <ResponsiveCell columnName={column.Header} value={value} />,
    };

    const columns = [
      {
        Header: 'Category',
        id: 'category',
        accessor: transaction => categories[transaction.categoryId],
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Amount',
        id: 'amount',
        Cell: ({ column, row }) => {
          const transaction = row.original;
          const amount = formatAmount(transaction.value);
          const amountCls = amount.isNegative ? styles.neg : styles.pos;

          return <ResponsiveCell columnName={column.Header} value={amount.text} className={amountCls} />;
        },
      },
    ];

    return (
      <Table
        className={styles.budgetGrid}
        rows={rows}
        columns={columns}
        defaultColumn={defaultColumn}
        TableComponent={TableComponent}
      />
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default connect(mapStateToProps)(BudgetGrid);

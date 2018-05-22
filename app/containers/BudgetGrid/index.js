// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import formatAmount from 'utils/formatAmount';
import EntryFormRow from 'containers/EntryFormRow';
import Table from 'components/Table';
import Column from 'components/Column';
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

    // Custom Cell component for every column in <Table>.
    // Used to show the column name within the cell in small resolutions, making the table responsive.
    const ResponsiveCell = ({ columnName, value, className }: ResponsiveCellProps) => (
      <div className={`${styles.responsiveCell} ${className || ''}`}>
        <div className={styles.cellLabel}>{columnName}</div>
        <div className={styles.cellContent}>{value}</div>
      </div>
    );

    const defaultColumn = {
      Cell: ({ column, value }) => <ResponsiveCell columnName={column.Header} value={value} />,
    };

    // Custom Cell component for the 'amount' column in <Table>
    // Used to customize the style
    const AmountCellComponent = ({ column, row }) => {
      const transaction = row.original;
      const amount = formatAmount(transaction.value);
      const amountCls = amount.isNegative ? styles.neg : styles.pos;

      return <ResponsiveCell columnName={column.Header} value={amount.text} className={amountCls} />;
    };

    // Custom TableComponent component passed to <Table>.
    // Used to render a custom form footer.
    const TableComponent = ({ children, ...otherProps }) => (
      <table {...otherProps}>
        {children}
        <tfoot>
          <EntryFormRow />
        </tfoot>
      </table>
    );

    return (
      <Table
        className={styles.budgetGrid}
        rows={transactions}
        defaultColumn={defaultColumn}
        TableComponent={TableComponent}
      >
        <Column Header="Category" id="category" accessor={transaction => categories[transaction.categoryId]} />
        <Column Header="Description" accessor="description" />
        <Column Header="Amount" id="amount" Cell={AmountCellComponent} />
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default connect(mapStateToProps)(BudgetGrid);

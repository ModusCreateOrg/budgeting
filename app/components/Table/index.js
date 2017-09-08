// @flow
import * as React from 'react';

type InputRow = { [attribute: string]: mixed };

type DefaultColumnConfiguration = {
  Header: React.ComponentType<any> | string,
  Cell: React.ComponentType<any> | string,
  Footer: React.ComponentType<any> | string,
};

type ColumnConfiguration = {
  id: string,
  accessor: ((inputRow: InputRow) => mixed) | string,
  Header: React.ComponentType<any> | string,
  Cell: React.ComponentType<any> | string,
  Footer: React.ComponentType<any> | string,
};

type ResolvedColumn = {
  id: string,
  accessor: (inputRow: InputRow) => mixed,
  Header: React.ComponentType<any> | string,
  Cell: React.ComponentType<any> | string,
  Footer: React.ComponentType<any> | string,
};

type ResolvedRow = {
  original: InputRow,
  index: number,
  [columnId: string]: mixed,
};

type FormData = {
  resolvedColumns: ResolvedColumn[],
  resolvedRows: ResolvedRow[],
};

type CellData = {
  column: ResolvedColumn,
  row: ResolvedRow,
  value: mixed,
};

type TableProps = {
  rows: InputRow[],
  columns: ColumnConfiguration[],
  defaultColumn: DefaultColumnConfiguration,
  TableComponent: React.ComponentType<any>,
  TheadComponent: React.ComponentType<any>,
  TbodyComponent: React.ComponentType<any>,
  TfootComponent: React.ComponentType<any>,
  TrComponent: React.ComponentType<any>,
  ThComponent: React.ComponentType<any>,
  TdComponent: React.ComponentType<any>,
};

const normalizeComponent = (
  StringOrComponent: React.ComponentType<any> | string,
  props: Object = {},
  fallback: mixed
) => {
  if (StringOrComponent) {
    if (typeof StringOrComponent === 'string') {
      return StringOrComponent;
    }
    return <StringOrComponent {...props} />;
  }
  return fallback;
};

class Table extends React.Component<TableProps> {
  static defaultProps = {
    defaultColumn: {},
    TableComponent: ({ children, ...otherProps }) => <table {...otherProps}>{children}</table>,
    TheadComponent: ({ children, ...otherProps }) => <thead {...otherProps}>{children}</thead>,
    TbodyComponent: ({ children, ...otherProps }) => <tbody {...otherProps}>{children}</tbody>,
    TfootComponent: ({ children, ...otherProps }) => <tfoot {...otherProps}>{children}</tfoot>,
    TrComponent: ({ children, ...otherProps }) => <tr {...otherProps}>{children}</tr>,
    ThComponent: ({ children, ...otherProps }) => <th {...otherProps}>{children}</th>,
    TdComponent: ({ children, ...otherProps }) => <td {...otherProps}>{children}</td>,
  };

  getOtherProps(): { [propName: string]: mixed } {
    const {
      rows,
      columns,
      defaultColumn,
      TableComponent,
      TheadComponent,
      TbodyComponent,
      TfootComponent,
      TrComponent,
      ThComponent,
      TdComponent,
      ...otherProps
    } = this.props;
    return otherProps;
  }

  getFormData(): FormData {
    const { columns, rows, defaultColumn } = this.props;

    const resolvedColumns = columns.map(column => {
      const resolvedColumn = { ...defaultColumn, ...column };

      // Handle accessor being a string
      if (typeof resolvedColumn.accessor === 'string') {
        resolvedColumn.id = resolvedColumn.id || resolvedColumn.accessor;
        const accessorString = resolvedColumn.accessor;
        resolvedColumn.accessor = row => row[accessorString];
      } else {
        // Handle accessor being a function (but require an ID)
        if (!resolvedColumn.id) {
          throw new Error('A column id is required if using a non-string accessor for the column.');
        }

        // Fallback to an undefined accessor
        if (!resolvedColumn.accessor) {
          resolvedColumn.accessor = () => undefined;
        }
      }

      return resolvedColumn;
    });

    const resolvedRows = rows.map((row, index) => {
      const resolvedRow = {
        original: row,
        index: index,
      };

      resolvedColumns.forEach(column => {
        resolvedRow[column.id] = column.accessor(row);
      });

      return resolvedRow;
    });

    return { resolvedColumns, resolvedRows };
  }

  render() {
    const { resolvedColumns, resolvedRows } = this.getFormData();
    const {
      TableComponent,
      TheadComponent,
      TbodyComponent,
      TfootComponent,
      TrComponent,
      ThComponent,
      TdComponent,
    } = this.props;

    const renderHeader = (column: ResolvedColumn): React.ElementType => (
      <ThComponent key={column.id}>
        {normalizeComponent(column.Header, {
          column: column,
          rows: resolvedRows,
        })}
      </ThComponent>
    );

    const renderRow = (row: ResolvedRow): React.ElementType => (
      <TrComponent key={row.index}>
        {resolvedColumns.map(column => {
          const cellData: CellData = {
            column: column,
            row: row,
            value: row[column.id],
          };

          return <TdComponent key={column.id}>{normalizeComponent(column.Cell, cellData, cellData.value)}</TdComponent>;
        })}
      </TrComponent>
    );

    const renderFooter = (column: ResolvedColumn): React.ElementType => (
      <ThComponent>
        {normalizeComponent(column.Footer, {
          column: column,
          rows: resolvedRows,
        })}
      </ThComponent>
    );

    const shouldRenderFooter = resolvedColumns.some(column => column.Footer);

    return (
      <TableComponent {...this.getOtherProps()}>
        <TheadComponent>
          <TrComponent>{resolvedColumns.map(renderHeader)}</TrComponent>
        </TheadComponent>
        <TbodyComponent>{resolvedRows.map(renderRow)}</TbodyComponent>
        {shouldRenderFooter && (
          <TfootComponent>
            <TrComponent>{resolvedColumns.map(renderFooter)}</TrComponent>
          </TfootComponent>
        )}
      </TableComponent>
    );
  }
}

export default Table;

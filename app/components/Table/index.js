// @flow
import * as React from 'react';
import Column from 'components/Column';

export type InputRow = { +[attribute: string]: any };

type DefaultColumnConfiguration = {
  Cell?: React.ComponentType<any> | string,
  Header?: React.ComponentType<any> | string,
  Footer?: React.ComponentType<any> | string,
};

type ColumnConfiguration = DefaultColumnConfiguration & {
  id?: string,
  accessor?: ((inputRow: InputRow) => mixed) | string,
};

type ResolvedColumn = DefaultColumnConfiguration & {
  id: string,
  accessor: (inputRow: InputRow) => mixed,
};

type ResolvedRow = {
  original: InputRow,
  index: number,
  [columnId: string]: mixed,
};

type TableData = {
  resolvedColumns: ResolvedColumn[],
  resolvedRows: ResolvedRow[],
};

type CellData = {
  column: ResolvedColumn,
  row: ResolvedRow,
  value: mixed,
};

type TableProps = {
  children: React.ChildrenArray<React.Element<typeof Column>>,
  rows: InputRow[],
  defaultColumn: DefaultColumnConfiguration,
  TableComponent: React.ComponentType<any>,
  TheadComponent: React.ComponentType<any>,
  TbodyComponent: React.ComponentType<any>,
  TfootComponent: React.ComponentType<any>,
  TrComponent: React.ComponentType<any>,
  ThComponent: React.ComponentType<any>,
  TdComponent: React.ComponentType<any>,
};

/**
 * Table component.
 *
 * It renders a <table> element. Here's a simple example:
 *
 * <Table rows={rows}>
 *   <Column Header="Name" accessor="name" />
 *   <Column Header="Age" id="age" accessor={row => row.getAge()} />
 * </Table>
 *
 * Simply pass the `rows` prop with an array of objects, and configure the columns. The table will update as you
 * change any props.
 *
 * Columns can be configured in two ways:
 * 1) Passing the 'defaultColumn` prop with a DefaultColumnConfiguration object, to configure every column in the table.
 * 2) Passing a 'Column' children with ColumnConfiguration props, to configure a specific column in the table.
 *
 * Here are the properties you can use to configure columns:
 * - Cell:     Component or string. Used to render a cell, defaults to the accessed value.
 * - Header:   Component or string. Used to render the header of a column.
 * - Footer:   Component or string. Used to render the footer of a column.
 * - accessor: Function that takes a row object and return the value to be populated for the column.
 *             If a sting is provided, a default accessor will be used, and it will try to get the value from
 *             row[accessor]
 * - id:       A unique ID is required if the accessor is not a string.
 *
 * Besides Cell, Header and Footer, you can also pass props to override the components responsible for rendering the
 * DOM table elements. (TableComponent, TheadComponent, ...)
 */
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

  /**
   * Utility function used to render a string or a component as a leaf element in the table.
   * It has a fallback value.
   */
  static normalizeComponent = (
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

  /**
   * Return all props that are not used by the component
   */
  getOtherProps(): { [propName: string]: mixed } {
    const {
      children,
      rows,
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

  /**
   * Get the properties passed to every Column children.
   */
  getColumnProperties(): ColumnConfiguration[] {
    const { children } = this.props;
    const columnProperties = [];

    React.Children.forEach(children, child => {
      // Check if children is of type column
      if (!child.type || child.type.displayName !== Column.displayName) {
        throw new Error('"Table" children should be of type "Column".');
      }

      // get its properties
      columnProperties.push(child.props);
    });

    return columnProperties;
  }

  /**
   * Return a TableData object from the Table props and children.
   */
  getTableData(): TableData {
    const { rows, defaultColumn } = this.props;
    const columnProperties = this.getColumnProperties();

    // resolves the accessor and id of every column.
    const resolvedColumns = columnProperties.map(column => {
      // mix column properties with the default column properties
      column = { ...defaultColumn, ...column };

      let { accessor, id, ...resolvedColumn } = column;

      // handle accessor being a string
      if (typeof accessor === 'string') {
        if (id === undefined) {
          id = accessor;
        }
        const accessorString = accessor;
        accessor = row => row[accessorString];
      } else {
        // handle accessor being a function (but require an ID)
        if (id === undefined) {
          throw new Error('A column id is required if using a non-string accessor for the column.');
        }

        // fallback to an undefined accessor
        if (accessor === undefined) {
          accessor = () => undefined;
        }
      }

      resolvedColumn = { ...resolvedColumn, accessor, id };
      return resolvedColumn;
    });

    // add a columnId property to every row, mapping to the resolved value for the column.
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
    const { resolvedColumns, resolvedRows } = this.getTableData();
    const {
      TableComponent,
      TheadComponent,
      TbodyComponent,
      TfootComponent,
      TrComponent,
      ThComponent,
      TdComponent,
    } = this.props;

    // render the th element for a column
    const renderHeader = (column: ResolvedColumn): React.Element<typeof ThComponent> => (
      <ThComponent key={column.id}>
        {Table.normalizeComponent(column.Header, {
          column: column,
          rows: resolvedRows,
        })}
      </ThComponent>
    );

    // render the tr element for a row
    const renderRow = (row: ResolvedRow): React.Element<typeof TrComponent> => (
      <TrComponent key={row.index}>
        {resolvedColumns.map(column => {
          const cellData: CellData = {
            column: column,
            row: row,
            value: row[column.id],
          };

          // render the td element for a cell
          return (
            <TdComponent key={column.id}>{Table.normalizeComponent(column.Cell, cellData, cellData.value)}</TdComponent>
          );
        })}
      </TrComponent>
    );

    // render the tr element for a column's footer
    const renderFooter = (column: ResolvedColumn): React.Element<typeof TrComponent> => (
      <TrComponent>
        {Table.normalizeComponent(column.Footer, {
          column: column,
          rows: resolvedRows,
        })}
      </TrComponent>
    );

    // only render footer if a custom Footer value is defined
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

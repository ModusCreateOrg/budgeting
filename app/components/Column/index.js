// @flow
import type { InputRow } from 'components/Table';

type ColumnProps = {|
  Cell?: React.ComponentType<any> | string,
  Header?: React.ComponentType<any> | string,
  Footer?: React.ComponentType<any> | string,
  id?: string,
  accessor?: ((inputRow: InputRow) => mixed) | string,
|};

/**
 * Column component.
 *
 * Meant to be used with the Table component.
 * Table takes one or many Column components as children. The Column components define characteristics
 * of a given column. Using Column components looks like:
 *
 * <Table rows={rows}>
 *   <Column Header="Name" accessor="name" />
 *   <Column Header="Age" id="age" accessor={row => row.getAge()} />
 * </Table>
 *
 * The order of the <Column> children will be the order of columns in the rendered Table.
 *
 * Documentation of the props can found in the Table component file.
 */
// eslint-disable-next-line no-unused-vars
const Column = (props: ColumnProps) => null;

// Explicitly set displayName, this way it's not removed in production and we can use it to check type
Column.displayName = 'Column';

export default Column;

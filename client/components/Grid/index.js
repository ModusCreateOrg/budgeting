import Grid from './Grid';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import Row from './Row';
import Cell from './Cell';

export { Grid };
export { Header };
export { Body };
export { Row };
export { Cell };

export default Object.assign(Grid, {
  Header, Footer, Body, Row, Cell
});

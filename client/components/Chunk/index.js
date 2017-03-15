// This component is based on the react-router v4 code splitting example here:
// https://reacttraining.com/react-router/web/guides/code-splitting
// This version is refactored to use the ES2015 import() loader spec.

import { Component, PropTypes } from 'react';

class Chunk extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  }

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null
    });

    props.load()
      .then((mod) => {
        this.setState({
          // handle both es imports and cjs
          mod: mod.default ? mod.default : mod
        });
      });
  }

  render() {
    const { mod } = this.state;

    return this.props.children(mod);
  }
}

export default Chunk;

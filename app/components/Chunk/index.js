import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';

class Chunk extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
  };

  state = {
    LoadedComponent: null,
  };

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
      LoadedComponent: null,
    });

    props.load().then(mod => {
      this.setState({
        // handle both es imports and cjs
        LoadedComponent: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    const { LoadedComponent } = this.state;

    return LoadedComponent ? <LoadedComponent {...this.props} /> : <Loading />;
  }
}

export default Chunk;

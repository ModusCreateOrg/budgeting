// @flow

import * as React from 'react';
import Loading from 'components/Loading';

type ChunkProps = {
  load: () => Promise<any>,
};

type ChunkState = {
  LoadedComponent: ?React.ComponentType<any>,
};

class Chunk extends React.Component<ChunkProps, ChunkState> {
  static propTypes = {
    load: React.PropTypes.func.isRequired,
  };

  state = {
    LoadedComponent: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: ChunkProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props: ChunkProps) {
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

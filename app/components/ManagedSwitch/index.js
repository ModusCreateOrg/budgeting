// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router-dom';
import { actions } from 'modules/location';

class ManagedSwitch extends React.Component<> {
  setLocation = (location): void => {
    this.props.setLocation({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    });
  };

  componentDidMount() {
    this.props.history.listen(location => this.setLocation(location));
    this.setLocation(this.props.history.location);
  }

  render() {
    return <Switch location={this.props.location}>{this.props.children}</Switch>;
  }
}

const mapStateToProps = state => ({
  location: state.location,
});

const mapDispatchToProps = {
  setLocation: actions.setLocation,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManagedSwitch)
);

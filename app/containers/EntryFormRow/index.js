import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDefaultCategoryId, getCategories } from 'selectors/categories';
import { actions } from 'modules/transactions';
import EntryFormRowComponent from 'components/EntryFormRow';

@connect(
  state => ({
    defaultCategoryId: getDefaultCategoryId(),
    categories: getCategories(state),
  }),
  {
    addTransaction: actions.addTransaction,
  }
)
class EntryFormRow extends Component {
  static propTypes = {
    defaultCategoryId: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    addTransaction: PropTypes.func.isRequired,
  };

  addEntry = values => {
    const { categoryId, description, value } = values;
    this.props.addTransaction({ categoryId, description, value });
  };

  render() {
    const { categories, defaultCategoryId } = this.props;

    const initialValues = { categoryId: defaultCategoryId };

    return <EntryFormRowComponent initialValues={initialValues} onSubmit={this.addEntry} categories={categories} />;
  }
}

export default EntryFormRow;

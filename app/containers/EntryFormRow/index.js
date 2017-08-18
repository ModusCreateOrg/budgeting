import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getDefaultCategoryId, getCategories } from 'selectors/categories';
import { actions } from 'modules/transactions';
import EntryFormRow from 'components/EntryFormRow';

@connect(
  state => ({
    defaultCategoryId: getDefaultCategoryId(),
    categories: getCategories(state),
  }),
  {
    addTransaction: actions.addTransaction,
  }
)
class EntryFormRowContainer extends Component {
  static propTypes = {
    defaultCategoryId: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    addTransaction: PropTypes.func.isRequired,
  };

  state = {
    categoryId: this.props.defaultCategoryId,
    description: '',
    value: '',
  };

  handleFieldChange = e => this.setState({ [e.target.name]: e.target.value });

  handleKeyUp = e => e.keyCode === 13 && this.addEntry();

  handleAddButtonClick = () => this.addEntry();

  handleValueRefUpdate = ref => {
    this.valueRef = ref;
  };

  addEntry = () => {
    const { categoryId, description, value } = this.state;

    // do nothing if there's no value added
    if (value) {
      this.props.addTransaction({ categoryId, description, value });

      // keep the chosen category but clear everything else
      this.setState({
        description: '',
        value: '',
      });
    }

    this.valueRef.focus();
  };

  render() {
    return (
      <EntryFormRow
        categories={this.props.categories}
        categoryId={this.state.categoryId}
        description={this.state.description}
        value={this.state.value}
        handleFieldChange={this.handleFieldChange}
        handleKeyUp={this.handleKeyUp}
        handleValueRefUpdate={this.handleValueRefUpdate}
        handleAddButtonClick={this.handleAddButtonClick}
      />
    );
  }
}

export default EntryFormRowContainer;

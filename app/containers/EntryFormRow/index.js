// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getDefaultCategoryId, getCategories } from 'selectors/categories';
import { actions } from 'modules/transactions';
import Form from 'components/Form';
import Field from 'components/Field';
import DataSelector from 'components/DataSelector';
import styles from './style.scss';

type EntryFormRowProps = {
  defaultCategoryId: string,
  categories: Object,
  addTransaction: Function,
};

type EntryFormRowState = {
  formData: Object,
};

class EntryFormRow extends React.Component<EntryFormRowProps, EntryFormRowState> {
  static formFields = ['categoryId', 'description', 'value'];

  static validateForm = ({ value }) => {
    const errors = {};

    if (!value) {
      errors.value = 'You must provide a value';
    }

    return errors;
  };

  state = {
    formData: {},
  };

  addEntry = values => {
    const { categoryId, description, value } = values;
    this.props.addTransaction({ categoryId, description, value });
  };

  handleSubmit = () => {
    const { formData } = this.state;

    // try to submit form
    const success = formData.handleSubmit();

    if (success) {
      // keep the chosen category but clear everything else
      formData.initializeForm({
        categoryId: formData.fields.categoryId.value,
      });
    }

    if (this.valueRef) {
      this.valueRef.focus();
    }
  };

  handleKeyUp = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    // submit if pressing enter
    const isEnterKey = event.keyCode === 13;
    if (isEnterKey) {
      this.handleSubmit();
    }
  };

  valueRef: ?HTMLElement;

  handleValueRefUpdate = (ref: ?HTMLElement) => {
    this.valueRef = ref;
  };

  handleFormDataChange = formData => {
    this.setState({
      formData: formData,
    });
  };

  render() {
    const { categories, defaultCategoryId } = this.props;
    const initialValues = { categoryId: defaultCategoryId };
    const { formData: { valid } } = this.state;

    return (
      <Form
        fields={EntryFormRow.formFields}
        initialValues={initialValues}
        validate={EntryFormRow.validateForm}
        onFormDataChange={this.handleFormDataChange}
        onSubmit={this.addEntry}
      >
        <tr className={styles.entryFormRow}>
          <td>
            <Field component={DataSelector} name="categoryId" data={categories} />
          </td>
          <td>
            <Field
              component="input"
              name="description"
              type="text"
              placeholder="Description"
              onKeyUp={this.handleKeyUp}
            />
          </td>
          <td>
            <Field
              component="input"
              name="value"
              type="number"
              placeholder="Value"
              onKeyUp={this.handleKeyUp}
              handleRef={this.handleValueRefUpdate}
            />
            <button onClick={this.handleSubmit} disabled={!valid}>
              Add
            </button>
          </td>
        </tr>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  defaultCategoryId: getDefaultCategoryId(),
  categories: getCategories(state),
});

const mapDispatchToProps = {
  addTransaction: actions.addTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryFormRow);

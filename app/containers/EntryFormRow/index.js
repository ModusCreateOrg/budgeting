// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getDefaultCategoryId, getCategories } from 'selectors/categories';
import { actions } from 'modules/transactions';
import Form from 'components/Form';
import Field from 'components/Field';
import DataSelector from 'components/DataSelector';
import type { FormData } from 'components/Form';
import styles from './style.scss';

type EntryFormRowProps = {
  defaultCategoryId: string,
  categories: Object,
  addTransaction: Function,
};

type EntryFormRowState = {
  formData: ?FormData,
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
    formData: null,
  };

  addEntry = (values): void => {
    const { categoryId, description, value } = values;
    this.props.addTransaction({ categoryId, description, value });
  };

  focusValueField = (): void => {
    if (this.valueRef) {
      this.valueRef.focus();
    }
  };

  handleSubmitSuccess = (): void => {
    const { formData } = this.state;

    // keep the chosen category but clear everything else
    if (formData) {
      formData.initializeForm({
        categoryId: formData.fields.categoryId.value,
      });
    }

    this.focusValueField();
  };

  handleSubmitFail = (): void => {
    this.focusValueField();
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
    const { formData } = this.state;
    const isValid = formData && formData.valid;

    return (
      <tr className={styles.entryFormRow}>
        <td>
          <Form
            fields={EntryFormRow.formFields}
            initialValues={initialValues}
            validate={EntryFormRow.validateForm}
            onFormDataChange={this.handleFormDataChange}
            onSubmit={this.addEntry}
            onSubmitSuccess={this.handleSubmitSuccess}
            onSubmitFail={this.handleSubmitFail}
          >
            <div className={styles.formSection}>
              <Field component={DataSelector} name="categoryId" data={categories} />
            </div>
            <div className={styles.formSection}>
              <Field component="input" name="description" type="text" placeholder="Description" />
            </div>
            <div className={styles.formSection}>
              <Field
                component="input"
                name="value"
                type="number"
                placeholder="Value"
                handleRef={this.handleValueRefUpdate}
              />
              <button type="submit" disabled={!isValid}>
                Add
              </button>
            </div>
          </Form>
        </td>
      </tr>
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

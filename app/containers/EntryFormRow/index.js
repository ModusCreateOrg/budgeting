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
  setEditTransaction: Function,
  addTransaction: Function,
  deleteTransaction: Function,
  updateTransaction: Function,
};

type EntryFormRowState = {
  formData: ?FormData,
};

export class EntryFormRow extends React.Component<EntryFormRowProps, EntryFormRowState> {
  static formFields = ['id', 'categoryId', 'description', 'value'];

  static validateForm = ({ value }) => {
    const errors = {};

    if (!value) {
      errors._error = 'You must provide a value';
    }

    return errors;
  };

  state = {
    formData: null,
  };

  handleSubmit = (values): void => {
    const { id, categoryId, description, value } = values;
    if (!id) {
      this.props.addTransaction({ categoryId, description, value });
    } else {
      this.props.updateTransaction({ id, categoryId, description, value });
      this.props.setEditTransaction('');
    }
  };

  handleDelete = (id): void => {
    this.props.setEditTransaction('');
    this.props.deleteTransaction(id);
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
    const { categories, defaultCategoryId, transaction, setEditTransaction } = this.props;
    const id = transaction ? transaction.id : '';
    const initialValues = {
      id,
      categoryId: transaction ? transaction.categoryId : defaultCategoryId,
      description: transaction ? transaction.description : '',
      value: transaction ? transaction.value : '',
    };
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
            onSubmit={this.handleSubmit}
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
            </div>
            <div className={styles.formSection}>
              <Field component="input" name="id" type="hidden" value={id} />
              <button className={`submit ${styles.btn} ${styles.btnGreen}`} type="submit" disabled={!isValid}>
                {!id ? 'Add' : 'Update'}
              </button>
              {id ? (
                <>
                  <button
                    className={`cancel ${styles.btn} ${styles.btnDefault}`}
                    type="button"
                    onClick={() => setEditTransaction('')}
                  >
                    Cancel
                  </button>
                  <button
                    className={`delete ${styles.btn} ${styles.btnRed}`}
                    type="button"
                    onClick={() => this.handleDelete(id)}
                  >
                    Delete
                  </button>
                </>
              ) : null}
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
  deleteTransaction: actions.deleteTransaction,
  updateTransaction: actions.updateTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryFormRow);

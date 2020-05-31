import React from "react";

import { connect } from "react-redux";
// https://redux-form.com/7.3.0/docs/api/field.md/
// https://redux-form.com/7.3.0/docs/api/reduxform.md/
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
// https://v0.material-ui.com/v0.20.0/#/components/text-field
import TextField from "material-ui/TextField";

import { postEvent } from "../actions";
import { FormFields } from "../types";
// export interface Props {
//   className?: string;
// }

// export type Field = {
//   input: any;
//   label: string;
//   type: string;
//   meta: {
//     touched: any;
//     error: any;
//   };
// };
export type Props = OwnProps & StateProps & DispatchProps;
type OwnProps = {
  className: string;
};
type StateProps = undefined;
type DispatchProps = {
  actions: {
    postEvent: Function;
  };
};

// export type Field = any;

const EventNew: React.FC<Props> = (props: Props) => {
  const renderField = (field: Field<HTMLInputElement>) => {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    }: any = field;
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    );
  };
  const onSubmit = async (values: FormFields) => {
    await postEvent(values);
    history.push("/");
  };
  const { handleSubmit, pristine, submitting, invalid } = props;
  const style = { margin: 12 };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field lable="Title" name="title" type="text" component={renderField} />
      </div>
      <div>
        <Field label="Body" name="body" type="text" component={renderField} />
      </div>
      <RaisedButton
        label="Submit"
        type="submit"
        style={style}
        disabled={pristine || submitting || invalid}
      />
      <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
    </form>
  );
};
const validate = (values: FormFields) => {
  const errors: FormFields = { title: "", body: "" };
  // タイトルが無かったらエラー
  if (!values.title) errors.title = "Enter a title, please.";

  // ボディーが無かったらエラー
  if (!values.body) errors.body = "Enter a body, please.";
  return errors;
};

const mapDispatchToProps = { postEvent };

// export default connect(
//   null,
//   mapDispatchToProps,
// )(reduxForm({ validate, form: "eventNewForm" })(EventNew));
const WrappedEventNew = connect(null, mapDispatchToProps)(EventNew);
export default reduxForm({
  validate: validate,
  form: "eventNewForm",
})(WrappedEventNew);

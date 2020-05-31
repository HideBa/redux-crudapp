import React, { useEffect, CSSProperties } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { getEvent, deleteEvent, putEvent } from "../actions";
import { render } from "@testing-library/react";

export interface Props {
  className?: string;
  initialValues: any;
  event: any;
  deleteEvent: any;
  getEvent: any;
  putEvent: any;
  reduxForm: any;
}

const EventsShow: React.FC<Props> = (props: Props)=> {
  useEffect(() => {
    const { id } = props.match.params;
    if (id) getEvent(id);
  });

  const renderField = field => {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        fullWidth={true}
      />
    );
  };

  const onDeleteClick = async () => {
    const { id } = match.params;
    await deleteEvent(id);
    history.push("/");
  };

  const onSubmit = async values => {
    await putEvent(values);
    history.push("/");
  };
  const { hadnleSubmit, pristine, submitting, invalid } = props;
  const style: CSSProperties = { margin: 12 };
  return (
    <>
      <form onSubmit={hadnleSubmit(onsubmit)}>
        <div>
          <Field label="title" name="title" type="text" component={renderField} />
        </div>
        <div>
          <Field lable="Body" name="body" type="text" component={renderField} />
        </div>
        <div>
          <RaisedButton
            label="Submit"
            type="submit"
            style={style}
            disabled={pristine || submitting || invalid}
          />
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
          <RaisedButton label="Delete" style={style} onClick={onDeleteClick} />
        </div>
      </form>
    </>
  );
};

const validate = (values: FormFields) => {
  const errors: FormFields = { title: undefined, body: undefined };
  // タイトルが無かったらエラー
  if (!values.title) errors.title = "Enter a title, please.";

  // ボディーが無かったらエラー
  if (!values.body) errors.body = "Enter a body, please.";
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id];
  return { initialValues: event, event };
};

const mapDispatchToProps = { deleteEvent, getEvent, putEvent }

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })( EventsShow);

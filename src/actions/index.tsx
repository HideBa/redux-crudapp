import axios from "axios";
export const READ_EVENTS = "READ_EVENTS";
export const READ_EVENT = "READ_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
import type { Event, FormFields } from "../types";
import { Action } from "redux";

const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v";
const QUERYSTRING = "?token=token123";

export const readEvents = () => async (dispatch: any) => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  ({ type: READ_EVENTS, response });
};

export const postEvent = (values: FormFields) => async (dispatch: any) => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  dispatch({ type: CREATE_EVENT, response });
};
export const putEvent = (values: FormFields) => async (dispatch: any) => {
  const response = await axios.put(`${ROOT_URL}/events${values.id}${QUERYSTRING}`);
  dispatch({ type: UPDATE_EVENT, response });
};

export const getEvent = (id: string) => async (dispatch: any) => {
  const response = await axios.get(`${ROOT_URL}/events${id}${QUERYSTRING}`);
  dispatch({ type: READ_EVENT, response });
};

export const deleteEvent = (id: string) => async (dispatch: any) => {
  await axios.delete(`${ROOT_URL}/events${id}${QUERYSTRING}`);
  dispatch({ type: DELETE_EVENT, id });
};

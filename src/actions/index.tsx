import axios, { AxiosResponse } from "axios";
export const READ_EVENTS = "READ_EVENTS" as const;
export const READ_EVENT = "READ_EVENT" as const;
export const UPDATE_EVENT = "UPDATE_EVENT" as const;
export const CREATE_EVENT = "CREATE_EVENT" as const;
export const DELETE_EVENT = "DELETE_EVENT" as const;
import { Event, FormFields } from "../types";
import { Action, Dispatch } from "redux";
// import { Dispatch } from "react";

const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v";
const QUERYSTRING = "?token=token123";

// export type Actions =
//   | ReturnType<typeof readEvents>
//   | ReturnType<typeof postEvent>
//   | ReturnType<typeof putEvent>
//   | ReturnType<typeof getEvent>
//   | ReturnType<typeof deleteEvent>;

export type ReadPostPutAction = Action & {
  type: typeof READ_EVENTS | typeof CREATE_EVENT | typeof UPDATE_EVENT | typeof READ_EVENTS;
  response: AxiosResponse;
};

export type DeleteAction = Action & {
  type: typeof DELETE_EVENT;
  id: string;
};
export type EventAction = ReadPostPutAction & DeleteAction;

export const readEvents = () => async (dispatch: Dispatch<Action>) => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  dispatch({ type: READ_EVENTS, response });
};

export const postEvent = (values: FormFields) => async (dispatch: Dispatch<Action>) => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  dispatch({ type: CREATE_EVENT, response });
};
export const putEvent = (values: FormFields) => async (dispatch: Dispatch<Action>) => {
  const response = await axios.put(`${ROOT_URL}/events${values.id}${QUERYSTRING}`);
  dispatch({ type: UPDATE_EVENT, response });
};

export const getEvent = (id: string) => async (dispatch: Dispatch<Action>) => {
  const response = await axios.get(`${ROOT_URL}/events${id}${QUERYSTRING}`);
  dispatch({ type: READ_EVENT, response });
};

export const deleteEvent = (id: string) => async (dispatch: Dispatch<Action>) => {
  await axios.delete(`${ROOT_URL}/events${id}${QUERYSTRING}`);
  dispatch({ type: DELETE_EVENT, id });
};

import _ from "lodash";
import { Event, FormFields } from "../types";
import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  EventAction,
} from "../actions";
import { Events } from "../types";
import { AxiosResponse } from "axios";

// type ReadEvent = () => (dispatch: any) => { type: string; response: AxiosResponse<any> };
// type ReadEvent = { type: string; response: AxiosResponse<any> };
// type PostPutEvent = (values: FormFields) => void;
// type GetDeleteEvent = (id: string) => void;
// type Action = ReadEvent | PostPutEvent | GetDeleteEvent;

export default (events: Events = [], action: EventAction) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT: {
      const data = action.response.data;
      return { ...events, [data.id]: data };
    }
    case READ_EVENTS:
      return _.mapKeys(action.response.data, "id");
    case DELETE_EVENT:
      delete events[parseInt(action.id)];
      return { ...events };
    default:
      return events;
  }
};

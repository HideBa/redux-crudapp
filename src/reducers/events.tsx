import _ from "lodash";
import type { Event } from "../types";
import { CREATE_EVENT, READ_EVENTS, READ_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../actions";
import type { Events } from "../types";
// type Action = {
//   type: string;
//   response: {
//     data: Event[];
//   }
// };
export default (events: Events = [], action: any) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      const data = action.response.data;
      return { ...events, [data.id]: data };
    case READ_EVENTS:
      return _.mapKeys(action.response.data, "id");
    case DELETE_EVENT:
      delete events[action.id];
      return { ...events };
    default:
      return events;
  }
};

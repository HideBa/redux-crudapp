export type Event = {
  id: string;
  title: string;
  body: string;
};

export type Events = Event[] | undefined;
// export type State = {
//   events: Event[];
// };

// export type ValidationError = {
//   title: string | undefined;
//   body: string | undefined;
// };

export type FormFields = {
  title: string | undefined;
  body: string | undefined;
};

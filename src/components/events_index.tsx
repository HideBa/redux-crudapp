import React, { useEffect, CSSProperties } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { readEvents } from "../actions";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Event } from "../types";
import styled from "styled-components";
import type { State } from "../index";

export interface Props {
  className?: string;
  events?: Event[] | undefined;
}

const EventIndex: React.FC<Props> = ({ className, events }) => {
  useEffect(() => {
    readEvents();
  });
  const renderEvents = () => {
    return _.map(events, event => {
      <TableRow key={event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </TableRowColumn>
        <TableRowColumn>{event.body}</TableRowColumn>
      </TableRow>;
    });
  };
  const style: CSSProperties = {
    position: "fixed",
    right: 12,
    bottom: 12,
  };
  return (
    <>
      <FloatingActionButton style={style} containerElement={<Link to="/events/new" />}>
        <ContentAdd />
      </FloatingActionButton>

      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Titile</TableHeaderColumn>
            <TableHeaderColumn>Body</TableHeaderColumn>
          </TableRow>
          <TableBody displayRowCheckbox={false}>{renderEvents()}</TableBody>
        </TableHeader>
      </Table>
    </>
  );
};

// const mapStateToProps = state => ({ events: state.events });
// const mapDispatchToProps = { readEvents };
export default connect(
  (state: State) => ({
    events: state.events,
  }),
  dispatch => ({ readEvents }),
)(EventIndex);

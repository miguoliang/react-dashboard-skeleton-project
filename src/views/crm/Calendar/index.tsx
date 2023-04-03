import React, { useEffect } from "react";
import { CalendarView, Container } from "components/shared";
import EventDialog from "./components/EventDialog";
import reducer from "./store";
import { injectReducer } from "store";
import { getEvents, updateEvent } from "./store/dataSlice";
import { openDialog, setSelected } from "./store/stateSlice";
import cloneDeep from "lodash/cloneDeep";
import { Event } from "../../../mock/data/crmData";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "store/hooks";

injectReducer("crmCalendar", reducer);

const Calendar = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.crmCalendar.data.eventList);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const onCellSelect = (event: DateSelectArg) => {
    const { start, end } = event;
    dispatch(
      setSelected({
        type: "NEW",
        start,
        end,
      }),
    );
    dispatch(openDialog());
  };

  const onEventClick = (arg: EventClickArg) => {
    const { start, end, id, title, extendedProps } = arg.event;

    dispatch(
      setSelected({
        type: "EDIT",
        eventColor: extendedProps.eventColor,
        title,
        start,
        end,
        id,
      }),
    );
    dispatch(openDialog());
  };

  const onSubmit = (data: Event, type: string) => {
    let newEvents = cloneDeep(events);

    if (type === "NEW") {
      newEvents.push(data);
    }

    if (type === "EDIT") {
      newEvents = newEvents.map((event: Event) => {
        if (data.id === event.id) {
          event = data;
        }
        return event;
      });
    }
    dispatch(updateEvent(newEvents));
  };

  const onEventChange = (arg: EventClickArg) => {
    const newEvents = cloneDeep(events).map((event: Event) => {
      if (arg.event.id === event.id) {
        const { id, extendedProps, start, end, title } = arg.event;
        event = {
          id,
          start: dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
          end: dayjs(end).format("YYYY-MM-DD HH:mm:ss"),
          title,
          eventColor: extendedProps.eventColor,
        };
      }
      return event;
    });
    dispatch(updateEvent(newEvents));
  };

  return (
    <Container className="h-full">
      <CalendarView
        events={events}
        eventClick={(evt) => onEventClick(evt)}
        select={(evt) => onCellSelect(evt)}
        editable
        selectable
        eventDrop={onEventChange}
      />
      <EventDialog submit={onSubmit} />
    </Container>
  );
};

export default Calendar;

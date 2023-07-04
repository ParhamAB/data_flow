import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ViewMyProcessScreen from "../components/my_process_screen/view_my_process_screen";
import ViewEventProcessScreen from "../components/events_screen/view_event_process_screen";
import NewEventProcessScreen from "../components/events_screen/new_processing_event_screen";
import NewFlowProcessScreen from "../components/flow_screen/new_processing_flow_screen";
import ViewFlowMyProcessScreen from "../components/flow_screen/view_flow_process_screen";
import StatisticalAnalysisOfDatabase from "../components/statistical_analysis_of_the_database/statistical_analysis_of_the_database";
import ViewFlowMyProcessByIdScreen from "../components/flow_screen/view_flow_process_by_id_screen";
import MainMenuScreen from "../components/main_menu_screen/main_menu_screen";
import ShowEventChart from "../components/events_screen/show_events_chart_screen/show_event_chart_screen";
import EventIntervalEventsScreen from "../components/events_screen/interval_events_screen/interval_events_screen";
import ViewEventNodeScreen from "../components/events_screen/event_node_screen/event_node_screen";

function Router() {
  return (
    <Routes>
      <Route
        path="/main-menu"
        element={<MainMenuScreen></MainMenuScreen>}
      ></Route>
      <Route
        path="/my-process"
        element={<ViewMyProcessScreen></ViewMyProcessScreen>}
      ></Route>
      <Route path="/events">
        <Route
          path="/events/new-process"
          element={<NewEventProcessScreen></NewEventProcessScreen>}
        ></Route>
        <Route
          path="/events/all-process"
          element={<ViewEventProcessScreen></ViewEventProcessScreen>}
        ></Route>
        <Route
          path="/events/all-process/statistics/:id"
          element={<ShowEventChart></ShowEventChart>}
        ></Route>
        <Route
          path="/events/all-process/interval-events/:id"
          element={<EventIntervalEventsScreen></EventIntervalEventsScreen>}
        ></Route>
        <Route
          path="/events/all-process/node-events/:id"
          element={<ViewEventNodeScreen></ViewEventNodeScreen>}
        ></Route>
      </Route>
      <Route path="/flow">
        <Route
          path="/flow/new-process"
          element={<NewFlowProcessScreen></NewFlowProcessScreen>}
        ></Route>
        <Route
          path="/flow/all-process"
          element={<ViewFlowMyProcessScreen></ViewFlowMyProcessScreen>}
        ></Route>
        <Route
          path="/flow/all-process/:id"
          element={<ViewFlowMyProcessByIdScreen></ViewFlowMyProcessByIdScreen>}
        ></Route>
      </Route>
      <Route
        path="/statistical-analysis-of-database"
        element={
          <StatisticalAnalysisOfDatabase></StatisticalAnalysisOfDatabase>
        }
      ></Route>
      <Route path="/*" element={<Navigate to={"/main-menu"} />}></Route>
    </Routes>
  );
}

export default Router;

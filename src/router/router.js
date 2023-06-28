import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ViewMyProcessScreen from "../components/my_process_screen/view_my_process_screen";
import ViewEventProcessScreen from "../components/events_screen/view_event_process_screen";
import NewEventProcessScreen from "../components/events_screen/new_processing_event_screen";
import NewFlowProcessScreen from "../components/flow_screen/new_processing_flow_screen";
import ViewFlowMyProcessScreen from "../components/flow_screen/view_flow_process_screen";

function Router() {
  return (
    <Routes>
      <Route path="/main-menu" element={<></>}></Route>
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
      </Route>
      <Route path="/statistical-analysis-of-database" element={<></>}></Route>
      <Route path="/*" element={<Navigate to={"/main-menu"} />}></Route>
    </Routes>
  );
}

export default Router;

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ViewMyProcessScreen from "../components/my_process_screen/view_my_process_screen";

function Router() {
  return (
    <Routes>
      <Route path="/main-menu" element={<></>}></Route>
      <Route
        path="/my-process"
        element={<ViewMyProcessScreen></ViewMyProcessScreen>}
      ></Route>
      <Route path="/events" element={<></>}>
        <Route path="/events/new-process" element={<></>}></Route>
        <Route path="/events/all-process" element={<></>}></Route>
      </Route>
      <Route path="/flow" element={<></>}>
        <Route path="/flow/new-process" element={<></>}></Route>
        <Route path="/flow/all-process" element={<></>}></Route>
      </Route>
      <Route path="/statistical-analysis-of-database" element={<></>}></Route>
      <Route path="/*" element={<Navigate to={"/main-menu"} />}></Route>
    </Routes>
  );
}

export default Router;

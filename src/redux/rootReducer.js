import { combineReducers } from "redux";
import processListReducer from "./my_process_screen/my_process_reducer";
import startTimeListReducer from "./start_time_redux/start_time_reducer";
import eventProcessListReducer from "./events_screen/get_event_process_redux/get_event_process_reducer";
import eventStartTimeListReducer from "./events_screen/event_start_time_redux/event_start_time_reducer";
import flowProcessListReducer from "./flow_screen/get_flow_process_redux/get_flow_process_reducer";
import flowStartTimeListReducer from "./flow_screen/flow_start_time_redux/flow_start_time_reducer";
import getYearsAnalysisListReducer from "./statistical-analysis-of-database_redux/years_redux/years_reducer";
import getMonthsAnalysisListReducer from "./statistical-analysis-of-database_redux/months_redux/months_reducer";
import getDaysAnalysisListReducer from "./statistical-analysis-of-database_redux/days_redux/days_reducer";
import getFlowProcessInfoListReducer from "./flow_screen/get_flow_process_by_id_redux/get_flow_process_info/get_flow_process_info_by_id_reducer";
import getFlowProcessStatisticsListReducer from "./flow_screen/get_flow_process_by_id_redux/get_flow_process_statistics/get_flow_process_statistics_reducer";

const rootReducer = combineReducers({
  processListState: processListReducer,
  eventProcessListState: eventProcessListReducer,
  flowProcessListState: flowProcessListReducer,
  startTimesState: startTimeListReducer,
  eventStartTimesState: eventStartTimeListReducer,
  flowStartTimesState: flowStartTimeListReducer,
  yearsAnalysisListState: getYearsAnalysisListReducer,
  monthsAnalysisListState: getMonthsAnalysisListReducer,
  daysAnalysisListState: getDaysAnalysisListReducer,
  getFlowProcessInfoListState: getFlowProcessInfoListReducer,
  getFlowProcessStatisticsListState: getFlowProcessStatisticsListReducer,
});

export default rootReducer;

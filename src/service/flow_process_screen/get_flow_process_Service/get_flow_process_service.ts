// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getFlowProcessListService(
  status: string,
  startDate: string,
  title: string,
  offset: number
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process/flow_process/?${
      status.length > 0 ? `_status=${status}&` : ""
    }_title=${title.length > 0 ? title : "0"}&_start_date=${
      startDate.length > 0 ? startDate : "2000-01-01T00:00:00"
    }&_offset=${offset !== null ? offset : 0}&_limit=15`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

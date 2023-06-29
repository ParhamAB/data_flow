// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getFlowProcessStatisticsService(
  id: number
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process/flows-statistics/${id}`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

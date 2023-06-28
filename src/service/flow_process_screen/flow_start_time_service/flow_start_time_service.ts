// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getFlowStartTimeListService(): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process/flow/start_dates`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

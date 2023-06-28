// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getEventStartTimeListService(): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process/event/start_dates`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

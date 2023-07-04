// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getIntervalEventsEachService(
  id_event_process: string
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process/event_process/events/${id_event_process}`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

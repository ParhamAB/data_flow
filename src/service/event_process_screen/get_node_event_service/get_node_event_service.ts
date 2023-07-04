// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getNodeEventsService(
  id_event_process: string
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process_cluster/event_process/${id_event_process}`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

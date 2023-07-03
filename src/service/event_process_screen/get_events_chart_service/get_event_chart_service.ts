// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getEventChartService(
  id_event_process: string,
  model_id: string
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process/events/statistics?_id_event_process=${id_event_process}&_model_id=${model_id}`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

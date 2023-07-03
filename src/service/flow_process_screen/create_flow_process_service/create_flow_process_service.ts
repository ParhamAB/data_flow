// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function postNewFlowTaskService(
  title: string,
  threshold: number,
  id_event_process: number,
  start_date_time: string,
  end_date_time: string
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(`process/task/flow/`, MethodsService.POST, {
    id_event_process: id_event_process,
    threshold: threshold,
    process_in: {
      start_date_time: start_date_time,
      end_date_time: end_date_time,
      title: title,
      social_network: "string",
      viewer_group_id: [0],
    },
  });
  return serviceCaller.response;
}

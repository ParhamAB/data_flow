// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getFlowProcessInfoService(
  id: number
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `process/flow_process_info/${id}`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

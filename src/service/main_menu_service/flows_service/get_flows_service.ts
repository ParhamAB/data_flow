// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getFlowsNewsListService(): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(`info/flow`, MethodsService.GET, null);
  return serviceCaller.response;
}

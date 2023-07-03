// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getEventsNewsListService(): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(`info/events`, MethodsService.GET, null);
  return serviceCaller.response;
}

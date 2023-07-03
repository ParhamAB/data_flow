// @ts-ignore
import { MethodsService, ServiceCaller } from "../../base_service.ts";

export default async function getMediaListService(): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(`info/media`, MethodsService.GET, null);
  return serviceCaller.response;
}

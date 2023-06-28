// @ts-ignore
import { MethodsService, ServiceCaller } from "../base_service.ts";

export default async function deleteProcessService(id: string): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(`process/delete/${id}`, MethodsService.DELETE, null);
  return serviceCaller.response;
}

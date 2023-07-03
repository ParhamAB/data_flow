// @ts-ignore
import { MethodsService, ServiceCaller } from "../base_service.ts";

export default async function getDateListService(): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `data/date/?_year=${new Date().getFullYear()}&_month=0`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

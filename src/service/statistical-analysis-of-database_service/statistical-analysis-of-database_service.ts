// @ts-ignore
import { MethodsService, ServiceCaller } from "../base_service.ts";

export default async function getStatisticalAnalysisService(
  year: string = "0",
  month: string = "0"
): Promise<any> {
  let serviceCaller = new ServiceCaller();
  await serviceCaller.call(
    `/data/statistics/?_year=${year}&_month=${month}`,
    MethodsService.GET,
    null
  );
  return serviceCaller.response;
}

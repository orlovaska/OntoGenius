import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IOntology } from "../models/IOntology";
import {
    downloadReport_ROUTE as downloadReport_ROUTE,
    getByUserId_ROUTE,
    ONTOLOGY_CONTROLLER_ROUTE,
} from "../utils/consts";
import { GetOntologyResponse } from "../models/response/GetOntologiesResponse";
import { DownloadReportResponse } from "../models/response/DownloadReportResponse";

export default class OntologyService {
    static async getOntologiesByUserId(
        id: number
    ): Promise<AxiosResponse<GetOntologyResponse>> {
        // static async getOntologiesByUserId(id: number): Promise<AxiosResponse<any>> {
        const result = axios.get<any>(
            `/api${ONTOLOGY_CONTROLLER_ROUTE}/${getByUserId_ROUTE}?id=${id}`
        );
        const response = await result;

        if (response) {
            console.log("fetchOntologies response: ", response);
            console.log("data: ", response?.data);
        }
        return result;
    }

    static async downloadReport(
        ontologyId: number
    ): Promise<AxiosResponse<DownloadReportResponse>> {
        const response = await axios.get<DownloadReportResponse>(
            `/api${ONTOLOGY_CONTROLLER_ROUTE}/${downloadReport_ROUTE}?ontologyId=${ontologyId}`
        );

        console.log("fetchOntologies response: ", response);

        const downloadReport = (reportData: ArrayBuffer, fileName: string) => {
            const blob = new Blob([reportData], {
                type: "application/octet-stream",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        };

        // Вызываем функцию для загрузки файла
        downloadReport(response.data.reportData, response.data.fileName);

        return response;

        //    console.log("fetchOntologies response: ", response);

        //    const downloadReport = (reportData: string, fileName: string) => {
        //     const blob = new Blob([reportData], { type: 'application/octet-stream' });
        //     const url = window.URL.createObjectURL(blob);
        //     const a = document.createElement('a');
        //     a.href = url;
        //     a.download = fileName;
        //     document.body.appendChild(a);
        //     a.click();
        //     window.URL.revokeObjectURL(url);
        //   };

        //   // Вызываем функцию для загрузки файла
        //   downloadReport(response.data.reportData, response.data.fileName);
        //    return response;
    }
}

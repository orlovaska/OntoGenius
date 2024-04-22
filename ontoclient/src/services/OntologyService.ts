import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IOntology } from "../models/IOntology";
import {
    addOntology_ROUTE,
    deleteOntology_ROUTE,
    downloadReport_ROUTE as downloadReport_ROUTE,
    getByUserId_ROUTE,
    ONTOLOGY_CONTROLLER_ROUTE,
} from "../utils/consts";
import { GetOntologyResponse } from "../models/response/GetOntologiesResponse";
import { DownloadReportResponse } from "../models/response/DownloadReportResponse";
import { AddOntologyResponse } from "../models/response/AddOntologyResponse";

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
    }

    static async addOntology(
        ownerUserId: number,
        name: string,
        description: string
    ): Promise<AxiosResponse<any>> {
        const response = await axios.post<AddOntologyResponse>(
            `/api${ONTOLOGY_CONTROLLER_ROUTE}/${addOntology_ROUTE}`,
            { description: description, ownerUserId: ownerUserId, name: name }
        );
        console.log("addOntology response: ", response);
        return response;
    }

    static async deleteOntology(id: number): Promise<AxiosResponse<any>> {
        const response = await axios.delete<any>(
            `/api${ONTOLOGY_CONTROLLER_ROUTE}/${deleteOntology_ROUTE}?id=${id}`
        );
        console.log("deleteClass response: ", response);
        return response;
    }
}

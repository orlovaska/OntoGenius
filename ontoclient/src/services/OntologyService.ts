import $api from "../http";
import axios, { AxiosResponse } from 'axios';
import { IUser } from "../models/IUser";
import { IOntology } from "../models/IOntology";
import { getByUserId_ROUTE, ONTOLOGY_CONTROLLER_ROUTE } from "../utils/consts";
import { GetOntologyResponse } from "../models/response/GetOntologiesResponse";

export default class OntologyService {
    static async getOntologiesByUserId(id: number): Promise<AxiosResponse<GetOntologyResponse>> {
    // static async getOntologiesByUserId(id: number): Promise<AxiosResponse<any>> {
        const result = axios.get<any>(`/api${ONTOLOGY_CONTROLLER_ROUTE}/${getByUserId_ROUTE}?id=${id}`);
        const response = await result;

        if (response) {
            console.log("fetchOntologies response: ", response);
            console.log("data: ", response?.data);
        }
        return result;
    }

    //static async fetchOntologies(id: number): Promise<AxiosResponse<any>> {
    //    const response = await axios.get<any>(`/api${ONTOLOGY_CONTROLLER_ROUTE}/register?id=${id}`);
    //    console.log("fetchOntologies response: ", response);
    //    return response;
    //}

}

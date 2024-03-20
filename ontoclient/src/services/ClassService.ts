import $api from "../http";
import axios, { AxiosResponse } from 'axios';
import { IUser } from "../models/IUser";
import { IOntology } from "../models/IOntology";
import { CLASS_CONTROLLER_ROUTE, getClassesByOntologyId_ROUTE } from "../utils/consts";
import { GetOntologyResponse } from "../models/response/GetOntologiesResponse";
import { GetClassesByOntologyIdResponse } from "../models/response/GetClassesByOntologyIdResponse";

export default class ClassService {
    static async getClassesByOntologyId(id: number): Promise<AxiosResponse<GetClassesByOntologyIdResponse>> {
        const result = axios.get<any>(`/api${CLASS_CONTROLLER_ROUTE}/${getClassesByOntologyId_ROUTE}?id=${id}`);
        const response = await result;

        if (response) {
            console.log("getClassesByOntologyId response: ", response);
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

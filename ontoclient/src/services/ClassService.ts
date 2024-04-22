import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IOntology } from "../models/IOntology";
import {
    CLASS_CONTROLLER_ROUTE,
    PROPERTY_CONTROLLER_ROUTE,
    addClass_ROUTE,
    deleteClass_ROUTE,
    getClassesByOntologyId_ROUTE,
    updateClass_ROUTE,
} from "../utils/consts";
import { GetOntologyResponse } from "../models/response/GetOntologiesResponse";
import { GetClassesByOntologyIdResponse } from "../models/response/GetClassesByOntologyIdResponse";
import { AddClassResponse } from "../models/response/AddClassResponse";

export default class ClassService {
    static async getClassesByOntologyId(
        id: number
    ): Promise<AxiosResponse<GetClassesByOntologyIdResponse>> {
        const result = axios.get<any>(
            `/api${CLASS_CONTROLLER_ROUTE}/${getClassesByOntologyId_ROUTE}?id=${id}`
        );
        const response = await result;

        if (response) {
            console.log("getClassesByOntologyId response: ", response);
            console.log("data: ", response?.data);
        }
        return result;
    }

    static async addClass(
        ontologyId: number,
        name: string,
        parentId: number
    ): Promise<AxiosResponse<any>> {
        const response = await axios.post<AddClassResponse>(
            `/api${CLASS_CONTROLLER_ROUTE}/${addClass_ROUTE}`,
            { ontologyId: ontologyId, parentClassId: parentId, name: name }
        );
        console.log("addClass response: ", response);
        return response;
    }

    static async updateClass(
        ontologyId: number,
        name: string,
        parentId: number,
        id: number
    ): Promise<AxiosResponse<any>> {
        const response = await axios.put<AddClassResponse>(
            `/api${CLASS_CONTROLLER_ROUTE}/${updateClass_ROUTE}`,
            { ontologyId: ontologyId, parentClassId: parentId, name: name, id: id }
        );
        console.log("updateClass response: ", response);
        return response;
    }

    static async deleteClass(id: number): Promise<AxiosResponse<any>> {
        const response = await axios.delete<any>(
            `/api${CLASS_CONTROLLER_ROUTE}//${deleteClass_ROUTE}?id=${id}`
        );
        console.log("deleteClass response: ", response);
        return response;
    }
}

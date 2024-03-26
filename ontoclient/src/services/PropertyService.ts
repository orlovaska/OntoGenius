import $api from "../http";
import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IOntology } from "../models/IOntology";
import {
    PROPERTY_CONTROLLER_ROUTE,
    addClass_ROUTE,
    addProperty_ROUTE,
    deleteClass_ROUTE,
    deleteProperty_ROUTE,
    getClassesByOntologyId_ROUTE,
    getPropertiesByOntologyId_ROUTE,
} from "../utils/consts";
import { GetPropertiesByOntologyIdResponse } from "../models/response/GetPropertiesByOntologyIdResponse";
import { AddPropertyResponse } from "../models/response/AddPropertyResponse";

export default class PropertyService {
    static async getPropertiesByOntologyId(
        id: number
    ): Promise<AxiosResponse<GetPropertiesByOntologyIdResponse>> {
        const result = axios.get<any>(
            `/api${PROPERTY_CONTROLLER_ROUTE}/${getPropertiesByOntologyId_ROUTE}?id=${id}`
        );
        const response = await result;

        if (response) {
            console.log("GetPropertiesByOntologyIdResponse: ", response?.data);
        }
        return result;
    }

    static async addProperty(
        ontologyId: number,
        name: string,
        parentId: number,
        domainClassId: number,
        rangeClassId: number
    ): Promise<AxiosResponse<any>> {
        const response = await axios.post<AddPropertyResponse>(
            `/api${PROPERTY_CONTROLLER_ROUTE}/${addProperty_ROUTE}`,
            {
                parentPropertyId: parentId,
                name: name,
                ontologyId: ontologyId,
                domainClassId: domainClassId,
                rangeClassId: rangeClassId,
            }
        );
        console.log("addProperty response: ", response);
        return response;
    }

    static async deleteProperty(id: number): Promise<AxiosResponse<any>> {
        const response = await axios.delete<any>(
            `/api${PROPERTY_CONTROLLER_ROUTE}//${deleteProperty_ROUTE}?id=${id}`
        );
        console.log("deleteProperty response: ", response);
        return response;
    }
}

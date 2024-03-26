import { IClass } from "./IClass";

export interface IProperty {
    id: number,
    ontologyId: number,
    name: string
    parentPropertyId: number;
    domainClassId: number;
    rangeClassId: number;
    // domainClass: IClass;
    // rangeClass: IClass;
}

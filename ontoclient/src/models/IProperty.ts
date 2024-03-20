import { IClass } from "./IClass";

export interface IProperty {
    id: number,
    name: string
    parentPropertyId: number;
    domainClass: IClass;
    rangeClass: IClass;
}

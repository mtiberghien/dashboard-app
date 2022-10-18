import { Layout } from "./layout";

export interface Dashboard{
    name: string;
    layout: Layout
    isLayoutMode: boolean;
    isEditMode: boolean;
    grow: number;
}
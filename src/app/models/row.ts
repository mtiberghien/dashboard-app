import { Cell } from "./cell";

export interface Row{
    grow?: number;
    cells: Cell[];
}
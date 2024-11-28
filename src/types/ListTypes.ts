import {ItemType} from "@/types/ItemType";

export interface ListType {
    id: number;
    criacao: string;
    listaProduto: [
        {
            id:number;
            produto: ItemType;
            quantidade: number
        }
    ];
    status: string
}
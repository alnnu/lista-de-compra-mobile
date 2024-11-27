export interface ItemType {
    id: number;
    nome: string;
    descricao: string;
    icon: {
        id: number;
        nome: string;
        biblioteca: string;
        cor: string;
    }
}
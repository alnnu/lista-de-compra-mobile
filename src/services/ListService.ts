import axios from "@/lib/axios";
import {ItemType} from "@/types/ItemType";


class ListService {
    getAtiva() {
        return axios.get("/lista/find/aberta")
    }

    addIten(iten:ItemType, id: number){
        return axios.put(`/lista/add/${id}`, iten)
    }
}

export default new ListService()
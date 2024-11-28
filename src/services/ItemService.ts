import axios from "@/lib/axios";



class ItemService {

    getItens() {
        return axios.get("/produto/all")
    }
}


export default new ItemService()
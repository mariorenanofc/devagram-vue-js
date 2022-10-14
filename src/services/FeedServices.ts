import { useAccessTokenStore } from "@/stores/accessToken";
import { HttpApiServices } from "./HttpApiServices";

export class FeedServices extends HttpApiServices{
    async getFeedPrincipal(){
        return await this.get('/feed');
    }

    async getFeedPorId(id: String){
        return await this.get('/feed?id='+ id);
    }

    async togglCurtir(id : String){
        return this.put(`/likes?id=${id}`);
    }
}
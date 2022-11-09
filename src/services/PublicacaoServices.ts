import { useAccessTokenStore } from "@/stores/accessToken";
import { HttpApiServices } from "./HttpApiServices";

export class CadastroServices extends HttpApiServices{
    async publicar(body : any){
        await this.post('/publicacao', body);
    }
}
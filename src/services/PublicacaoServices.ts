import { HttpApiServices } from "./HttpApiServices";

export class PublicacaoServices extends HttpApiServices{
    async publicar(body : any){
        await this.post('/publicacao', body);
    }
}
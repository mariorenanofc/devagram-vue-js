import { HttpApiServices } from "./HttpApiServices";

export class UsuarioServices extends HttpApiServices{
    async pesquisar(filtro : String){
        return this.get('/pesquisa?filtro='+ filtro)
    }
    
}
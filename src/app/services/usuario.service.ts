import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { environment } from "../../environments/environments";
import { Usuario } from "../models/usuario.model";
import { Observable } from "rxjs";
@Injectable({ providedIn: 'root'})
export class UsuarioService{

    private httpClient = inject(HttpClient);
    private tokenService = inject(TokenService)
    
    get(): Observable<Usuario[]>{
        const token = this.tokenService.get();
        const headers = new HttpHeaders({
            Authorization: 'Bearer '+token
        });

        return this.httpClient.get<Usuario[]>(environment.apiContatos + '/usuarios', {headers});
    }

    getById(id: number): Observable<Usuario>{
        const token = this.tokenService.get();
        const headers = new HttpHeaders({
            Authorization: 'Bearer '+token
        });

        return this.httpClient.get<Usuario>(environment.apiContatos + '/usuarios/' + id, {headers});
    }
}
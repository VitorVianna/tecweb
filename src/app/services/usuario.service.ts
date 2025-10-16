import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "../models/usuario.model";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";
import { environment } from "../../environments/environments";

@Injectable({ providedIn: 'root'})
export class UsuarioService{
    private httpClient = inject(HttpClient);
    private tokenService = inject(TokenService);

    get(): Observable<Usuario[]>{
        const token = this.tokenService.get();
        const headers = new HttpHeaders({
            Authorization: "Bearer " + token
        })

        return this.httpClient.get<Usuario[]>(environment.apiContatos + "/usuarios", { headers });
    }
}
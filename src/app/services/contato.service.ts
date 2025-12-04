import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable,catchError, throwError } from "rxjs";
import { environment } from '../../environments/environments'
import { TokenService } from "./token.service";
import { Contato } from "../models/contato.model";

@Injectable({ providedIn: 'root'})
export class ContatoService{
    private http = inject(HttpClient);
    private tokenService = inject(TokenService)

    getContatoUsuario(idUsuario: number): Observable<Contato[]>{
        const token = this.tokenService.get();
        const headers = new HttpHeaders({
            Authorization: 'Bearer '+token
        });
        return this.http.get<Contato[]>(`${environment.apiContatos}/usuarios/${idUsuario}/contatos`,{headers});
    }
}